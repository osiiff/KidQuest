

import { auth } from "@/auth";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { signOutUser } from "@/lib/actions/user.actions";
import { Plus } from "lucide-react";
import Link from "next/link";
import { SheetClose } from "@/components/ui/sheet";


const UserButton = async ({ variant = "default" }: { variant?: "default" | "compact" | "menu" }) => {
    const session = await auth();

    const subscriptionLink = (
        <Link href='/subscription' className="btn-primary pastel-pink text-pink-600 whitespace-nowrap">
            KidQuest <Plus className="w-4 h-4 shrink-0"/>
        </Link>
    );

    if (variant === "menu") {
        return (
            <div className="flex flex-col gap-3">
                {!session && (
                    <>
                        <SheetClose asChild>
                            <Link href='/sign-in' className="btn-secondary w-full">Sign In</Link>
                        </SheetClose>
                        <SheetClose asChild>
                            <Link href='/sign-up' className="btn-primary w-full">Sign Up</Link>
                        </SheetClose>
                    </>
                )}
                <SheetClose asChild>{subscriptionLink}</SheetClose>
            </div>
        );
    }

    if (!session) {
        if (variant === "compact") {
            return (
                <Link href='/sign-in' className="inline-flex min-h-11 w-auto flex-none items-center justify-center rounded-md border-[1.5px] border-[rgba(139,124,246,0.28)] bg-white/75 px-2 text-sm font-bold whitespace-nowrap text-(--primary-dark) shadow-[0_12px_26px_rgba(92,84,170,0.08)] transition hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:px-4 sm:text-base">
                    Sign In
                </Link>
            );
        }

        return (
            <>
                <Link href='/sign-in' className="btn-secondary">
                    Sign In
                </Link>
                <Link href='/sign-up' className="btn-primary">
                    Sign Up
                </Link>
                {subscriptionLink}
            </>
        )
    }

    const firstInitial = session.user?.name?.charAt(0).toUpperCase() ?? 'U';


    return (
        <div className={variant === "compact" ? "flex size-11 flex-none items-center justify-center" : "flex shrink-0 items-center gap-3"}>
            {variant !== "compact" && subscriptionLink}
            <DropdownMenu>
                <DropdownMenuTrigger asChild >
                    <button aria-label="Open profile menu" className={variant === "compact" ? "inline-flex size-11 min-h-11 min-w-11 flex-none items-center justify-center rounded-full bg-linear-to-br from-[#9b8cff] to-[#7465f0] p-0 text-base font-bold text-white shadow-[0_14px_26px_rgba(116,101,240,0.28)] transition-shadow hover:shadow-[0_20px_34px_rgba(116,101,240,0.34)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" : "flex shrink-0 items-center btn-primary rounded-full"} type="button">
                        {firstInitial}
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 min-w-0 max-w-[calc(100vw-2rem)] max-h-[min(var(--radix-dropdown-menu-content-available-height),calc(100dvh-2rem))] overflow-y-auto overscroll-contain rounded-2xl bg-white p-2 shadow-[0_8px_24px_rgba(92,84,170,0.14)]" align="end" sideOffset={8} collisionPadding={16} avoidCollisions forceMount>
                    <DropdownMenuLabel className="min-w-0 px-3 py-2">
                        <div className="min-w-0 space-y-1">
                            <div className="truncate text-base leading-6 font-semibold text-primary" title={session.user?.name ?? undefined}>
                                {session.user?.name}
                            </div>
                            <div className="truncate text-sm leading-5 font-normal text-(--muted)" title={session.user?.email ?? undefined}>
                                {session.user?.email}
                            </div>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="mx-0 my-2" />
                    <DropdownMenuItem asChild>
                        <Link href='/user/profile' className="flex min-h-11 w-full min-w-0 items-center rounded-xl px-3 py-2.5 text-sm leading-5 font-normal whitespace-nowrap text-[#35336f]">
                        User Profile
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href='/user/subscriptions' className="flex min-h-11 w-full min-w-0 items-center rounded-xl px-3 py-2.5 text-sm leading-5 font-normal whitespace-nowrap text-[#35336f]">
                        Subscriptions History
                        </Link>
                    </DropdownMenuItem>
                    {session?.user?.role === 'admin' && (
                        <DropdownMenuItem asChild>
                            <Link href='/admin/overview' className="flex min-h-11 w-full min-w-0 items-center rounded-xl px-3 py-2.5 text-sm leading-5 font-normal whitespace-nowrap text-[#35336f]">
                            Admin
                            </Link>
                        </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator className="mx-0 my-2" />
                    <form action={signOutUser} className="w-full min-w-0">
                        <DropdownMenuItem asChild>
                            <button type="submit" className="flex min-h-11 w-full min-w-0 items-center rounded-xl px-3 py-2.5 text-left text-sm leading-5 font-normal whitespace-nowrap text-pink-500">
                                Sign Out
                            </button>
                        </DropdownMenuItem>
                    </form>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default UserButton;
