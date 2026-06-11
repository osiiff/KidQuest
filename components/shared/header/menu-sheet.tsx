import Menu from "./menu";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { EllipsisVertical } from "lucide-react";
import Link from "next/link";
import UserButton from "./user-button";



const MenuSheet = () => {
    return (
        <div>
            <div className="">
                <Menu/>
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
                        <UserButton/>
                    </SheetContent>
                </Sheet>
            </nav>
        </div>
    )
}

export default MenuSheet;