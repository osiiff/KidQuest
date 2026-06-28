import Link from "next/link";
import UserButton from "./user-button";
import { Plus } from "lucide-react";

const Menu = () => {
    return (
        <div className="flex-between gap-5" >
            <nav className="nav flex-center" >
                <Link href='/' className="nav-link" >
                    Home
                </Link>
                <Link href='/subjects' className="nav-link" >
                    Subjects
                </Link>
                <Link href='/about' className="nav-link" >
                    About
                </Link>
            </nav>
            <nav className="nav">
                <UserButton/>
                <Link href='/subscribition' className="btn-primary pastel-pink text-pink-600">
                        KidQuest <Plus className="w-4 h-4"/>
                </Link>
            </nav>
        </div>
    )
}

export default Menu;