

import { auth } from "@/auth";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { signOutUser } from "@/lib/actions/user.actions";
import Link from "next/link";


const UserButton = async () => {
    const session = await auth();

    if (!session) {
        return (
            <>
                <Link href='/sign-in' className="btn-secondary">
                    Sign In
                </Link>
                <Link href='/sign-up' className="btn-primary">
                    Sign Up
                </Link>
            </>
        )
    }

    const firstInitial = session.user?.name?.charAt(0).toUpperCase() ?? 'U';


    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center">
                    <button className="btn-primary rounded-full">
                        {firstInitial}
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent  className="w-56 bg-white" align="end" forceMount>
                    <DropdownMenuLabel>
                        <div className="hero-text text-primary">
                            <div className="">
                                {session.user?.name}
                            </div>
                            <div className="text-sm">
                                {session.user?.email}
                            </div>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuItem>
                        <form action={signOutUser}>
                            <button className="w-full nav-link flex pastel-pink">
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