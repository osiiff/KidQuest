import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import vm from "node:vm";
import ts from "typescript";

// Run the actual server modules with isolated auth/cache/DB dependencies.
// No Next server, account credentials, database writes or browser are required.
function loadModule(path, mocks) {
  const source = readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      jsx: ts.JsxEmit.ReactJSX,
      esModuleInterop: true,
    },
    fileName: path,
  });
  const compiledModule = { exports: {} };
  const requireMock = (name) => {
    assert.ok(Object.hasOwn(mocks, name), `Unmocked dependency: ${name}`);
    return mocks[name];
  };
  const run = vm.runInThisContext(`(function(require, module, exports) {${outputText}\n})`, { filename: path });
  run(requireMock, compiledModule, compiledModule.exports);
  return compiledModule.exports;
}

function profileAction({ session = { user: { id: "test-user" } }, failWrite = false } = {}) {
  const events = [];
  const { updateProfile } = loadModule("lib/actions/user.actions.ts", {
    "../validators": { updateProfileSchema: { parse: (value) => value } },
    "@/auth": {
      auth: async () => session,
      updateSession: async (value) => { events.push(["session", value]); },
    },
    "next/dist/client/components/redirect-error": {},
    "bcrypt-ts-edge": {},
    "../prisma": { prisma: { user: {
      findFirst: async (query) => {
        events.push(["find", query]);
        return { id: "test-user" };
      },
      update: async (query) => {
        events.push(["write", query]);
        if (failWrite) throw new Error("Simulated write failure");
        return { name: "Saved name" };
      },
    } } },
    "../format-error": { formatError: () => "Profile update failed" },
    "next/cache": { revalidatePath: (...args) => { events.push(["revalidate", ...args]); } },
    "../generated/prisma/client": {},
  });
  return { updateProfile, events };
}

test("profile save updates the server session before invalidating all cached layouts", async () => {
  const { updateProfile, events } = profileAction();
  const result = await updateProfile({ name: "Submitted name", email: "test@example.invalid" });
  assert.equal(result.success, true);
  assert.deepEqual(events.map(([event]) => event), ["find", "write", "session", "revalidate"]);
  assert.deepEqual(events[2], ["session", { user: { name: "Saved name" } }]);
  assert.deepEqual(events[3], ["revalidate", "/", "layout"]);
  assert.deepEqual(events[1][1].where, { id: "test-user" });
  assert.deepEqual(Object.keys(events[1][1].data), ["name"]);
});

test("failed profile save does not publish a different session name", async () => {
  const { updateProfile, events } = profileAction({ failWrite: true });
  const result = await updateProfile({ name: "Submitted name", email: "test@example.invalid" });
  assert.equal(result.success, false);
  assert.equal(events.some(([event]) => event === "session" || event === "revalidate"), false);
});

test("signed-out and incomplete sessions cannot update any profile", async () => {
  for (const session of [null, { user: {} }]) {
    const { updateProfile, events } = profileAction({ session });
    const result = await updateProfile({ name: "Submitted name", email: "test@example.invalid" });
    assert.equal(result.success, false);
    assert.deepEqual(events, []);
  }
});

const jsx = (type, props) => ({ type, props });
function findNodes(node, type) {
  if (!node || typeof node !== "object") return [];
  if (Array.isArray(node)) return node.flatMap((child) => findNodes(child, type));
  return [
    ...(node.type === type ? [node] : []),
    ...findNodes(node.props?.children, type),
  ];
}

test("public, profile and admin layouts use the same header outside their secondary navigation", () => {
  const Header = () => null;
  const SecondaryNav = () => null;
  const mocks = {
    "react/jsx-runtime": { jsx, jsxs: jsx },
    "@/components/shared/header": { __esModule: true, default: Header },
    "@/components/footer": { __esModule: true, default: () => null },
    "./main-nav": { __esModule: true, default: SecondaryNav },
    "@/components/admin/search-form": { __esModule: true, default: () => null },
  };
  for (const path of ["app/(root)/layout.tsx", "app/user/layout.tsx", "app/admin/layout.tsx"]) {
    const { default: Layout } = loadModule(path, mocks);
    const tree = Layout({ children: null });
    assert.equal(findNodes(tree, Header).length, 1, path);
    assert.equal(tree.props.children[0].type, Header, path);
    for (const nav of findNodes(tree, SecondaryNav)) {
      assert.match(nav.props.className, /flex-wrap/);
    }
  }
});

test("account menu follows the confirmed guest/user/admin session on desktop and compact headers", async () => {
  let session = null;
  const Link = () => null;
  const { default: UserButton } = loadModule("components/shared/header/user-button.tsx", {
    "react/jsx-runtime": { jsx, jsxs: jsx, Fragment: "fragment" },
    "@/auth": { auth: async () => session },
    "@/components/ui/dropdown-menu": Object.fromEntries([
      "DropdownMenu", "DropdownMenuContent", "DropdownMenuItem", "DropdownMenuLabel",
      "DropdownMenuSeparator", "DropdownMenuTrigger",
    ].map((name) => [name, name])),
    "@/lib/actions/user.actions": { signOutUser: async () => {} },
    "lucide-react": { Plus: "plus" },
    "next/link": { __esModule: true, default: Link },
    "@/components/ui/sheet": { SheetClose: "sheet-close" },
  });
  for (const variant of ["default", "compact"]) {
    // Includes returning to guest and signing in again, without reloading the module.
    for (const role of [null, "user", "admin", null, "user"]) {
      session = role ? { user: { id: "test-user", name: "Test", email: "test@example.invalid", role } } : null;
      const tree = await UserButton({ variant });
      const profileButtons = findNodes(tree, "button").filter((node) => node.props["aria-label"] === "Open profile menu");
      const links = findNodes(tree, Link).map((node) => node.props.href);
      assert.equal(profileButtons.length, role ? 1 : 0);
      assert.equal(links.includes("/sign-in"), !role);
      assert.equal(links.includes("/admin/overview"), role === "admin");
      if (role) {
        assert.equal(links.includes("/user/profile"), true);
        assert.equal(links.includes("/user/subscriptions"), true);
        assert.equal(findNodes(tree, "form").length, 1);
      }
    }
  }
});
