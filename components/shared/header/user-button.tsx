

import { auth } from "@/auth";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { signOutUser } from "@/lib/actions/user.actions";
import { Plus } from "lucide-react";
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
                <Link href='/subscription' className="btn-primary pastel-pink text-pink-600">
                        KidQuest <Plus className="w-4 h-4"/>
                </Link>
            </>
        )
    }

    const firstInitial = session.user?.name?.charAt(0).toUpperCase() ?? 'U';


    return (
        <div className="flex gap-3">
            <Link href='/subscription' className="btn-primary pastel-pink text-pink-600">
                    KidQuest <Plus className="w-4 h-4"/>
            </Link>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className="flex items-center btn-primary rounded-full" type="button">
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