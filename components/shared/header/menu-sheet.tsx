import Menu from "./menu";
import Login from "./login";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { EllipsisVertical } from "lucide-react";
import Link from "next/link";



const MenuSheet = () => {
    return (
        <div>
            <div className="w-full justify-between flex">
                <Menu/>
                <Login/>
            </div>
            <nav className="md:hidden">
                <Sheet>
                    <SheetTrigger className="align-middle">
                        <EllipsisVertical/>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetTitle className="hero-title flex-center">Menu</SheetTitle>
                        <SheetDescription></SheetDescription>
                        <Link href='/' className="nav-link" >
                            Home
                        </Link>
                        <Link href='/subjects' className="nav-link" >
                            Subjects
                        </Link>
                        <Link href='/about' className="nav-link" >
                            About
                        </Link>
                        <Link href='/login' className="btn-secondary">
                            Log In
                        </Link>
                        <Link href='/signup' className="btn-primary">
                            Sign Up
                        </Link>
                    </SheetContent>
                </Sheet>
            </nav>
        </div>
    )
}

export default MenuSheet;