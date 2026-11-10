

import { auth } from "@/auth";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
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
                <Link href='/sign-in' className="btn-secondary min-h-11 w-auto shrink-0 whitespace-nowrap px-3 text-sm sm:px-4 sm:text-base">
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
                <DropdownMenuContent className="w-56 max-w-[calc(100vw-2rem)] bg-white [&_.hero-title]:mt-0 [&_.hero-title]:break-words [&_.hero-title]:text-base [&_.hero-title]:leading-snug" align="end" forceMount>
                    <DropdownMenuLabel>
                        <div className="hero-title text-2xl text-primary">
                            <div className="">
                                {session.user?.name}
                            </div>
                            <div className="font-medium">
                                {session.user?.email}
                            </div>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuItem>
                        <Link href='/user/profile' className="w-full hero-title text-2xl">
                        User Profile
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link href='/user/subscriptions' className="w-full hero-title text-2xl">
                        Subscriptions History
                        </Link>
                    </DropdownMenuItem>
                    {session?.user?.role === 'admin' && (
                        <DropdownMenuItem>
                            <Link href='/admin/overview' className="w-full hero-title text-2xl">
                            Admin
                            </Link>
                        </DropdownMenuItem>
                    )}
                    <DropdownMenuItem>
                        <form action={signOutUser}>
                            <button className="w-full hero-title text-2xl text-pink-500">
                                Sign Out
                            </button>
                        </form>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default UserButton;
