import Link from "next/link";
import Image from "next/image";
import { APP_NAME } from "@/lib/constants";
import MenuSheet from "./menu-sheet";
import SubjectsSlidebar from "../subjects/subjects-sidebar";

const Header = () => {
    return (
        <header className="header" >
            <div className="wrapper flex-between p-0" >
                <div className="sm:mr-20">
                    <SubjectsSlidebar/>
                </div>
                <div className="logo" >
                    <Link href='/'  >
                        <Image className="logo-icon"
                        src='/logo.png' 
                        alt={`${APP_NAME}`}
                        height={400}
                        width={400}
                        priority={true}>
                        </Image>
                    </Link>
                    <p className="text-primary" >{APP_NAME}</p>
                </div>
                <MenuSheet/>
            </div>
        </header>
    )
}

export default Header;