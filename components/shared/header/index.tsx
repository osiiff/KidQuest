import Link from "next/link";
import Image from "next/image";
import { APP_NAME } from "@/lib/constants";
import Menu from "./menu";
import Login from "./login";

const Header = () => {
    return (
        <header className="header" >
            <div className="wrapper flex-between" >
                <div className="logo" >
                    <Link href='/'  >
                        <Image className="logo-icon"
                        src='/logo.png' 
                        alt={`${APP_NAME}`}
                        height={48}
                        width={48}
                        priority={true}>
                        </Image>
                    </Link>
                    <p className="text-primary" >{APP_NAME}</p>
                </div>
                <Menu/>
                <Login/>
            </div>
        </header>
    )
}

export default Header;