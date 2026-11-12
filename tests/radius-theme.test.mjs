import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { __unstable__loadDesignSystem } from "@tailwindcss/node";
import postcss from "postcss";
import { twMerge } from "tailwind-merge";

const base = fileURLToPath(new URL("../", import.meta.url));
const source = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
const design = await __unstable__loadDesignSystem(source, { base });
const root = postcss.parse(source);
const radii = { sm: "12px", md: "18px", lg: "24px", xl: "32px", "2xl": "40px", "3xl": "48px", "4xl": "56px" };

function radiusDeclaration(candidate) {
  const css = design.candidatesToCss([candidate])[0];
  assert.ok(css, `Missing CSS for ${candidate}`);
  let result;
  postcss.parse(css).walkDecls("border-radius", (decl) => { result = decl.value; });
  return result;
}

test("rounded utilities reference defined Kid Quest tokens without an undefined base radius", () => {
  for (const [size, value] of Object.entries(radii)) {
    assert.equal(design.resolveThemeValue(`--radius-${size}`), value);
    assert.equal(radiusDeclaration(`rounded-${size}`), `var(--radius-${size})`);
  }
  assert.equal(radiusDeclaration("rounded-full"), "calc(infinity * 1px)");
});

test("header Sign In has theme-independent pill corners and hero keeps its 18px token", async () => {
  const header = await readFile(new URL("../components/shared/header/user-button.tsx", import.meta.url), "utf8");
  const signInClasses = [...header.matchAll(/href='\/sign-in' className="([^"]*)"/g)];
  assert.equal(signInClasses.length, 3);
  for (const [, classes] of signInClasses) assert.match(classes, /\brounded-full\b/);
  assert.equal(radiusDeclaration("rounded-full"), "calc(infinity * 1px)");
  let legacyRadius;
  root.walkRules(".btn-secondary", (rule) => {
    rule.walkDecls("border-radius", (decl) => { legacyRadius = decl.value; });
  });
  assert.equal(radiusDeclaration("rounded-md"), legacyRadius);
  assert.equal(design.resolveThemeValue("--radius-md"), "18px");
});

test("canonical rounded-2xl and the previous explicit variable use the same token", () => {
  assert.equal(radiusDeclaration("rounded-2xl"), radiusDeclaration("rounded-[var(--radius-2xl)]"));
  assert.equal(design.resolveThemeValue("--radius-2xl"), "40px");
});

test("legacy radius values are preserved and class merging retains explicit overrides", () => {
  root.walkRules(":root", (rule) => {
    rule.walkDecls(/^--radius-/, (decl) => {
      const size = decl.prop.slice("--radius-".length);
      assert.equal(design.resolveThemeValue(decl.prop), radii[size]);
    });
  });
  assert.equal(twMerge("rounded-lg", "rounded-md"), "rounded-md");
  assert.equal(twMerge("rounded-lg", "rounded-full"), "rounded-full");
  assert.equal(radiusDeclaration("rounded-[min(var(--radius-md),12px)]"), "min(var(--radius-md), 12px)");
});
