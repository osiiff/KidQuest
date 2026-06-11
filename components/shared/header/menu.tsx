import Link from "next/link";
import UserButton from "./user-button";

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
            </nav>
        </div>
    )
}

export default Menu;