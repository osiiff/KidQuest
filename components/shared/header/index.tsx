
import Link from "next/link";
import Image from "next/image";
import { APP_NAME } from "@/lib/constants";
import MenuSheet from "./menu-sheet";

const Header = () => {
    return (
        <header className="header px-4 py-4 min-[721px]:px-6 xl:px-9 xl:py-5" >
            <div className="wrapper flex flex-nowrap items-center justify-between gap-2 p-0 sm:gap-5" >
                
                <div className="logo min-w-0 shrink-0 gap-2 text-2xl sm:gap-3 sm:text-[32px]" >
                    <Link href='/' className="shrink-0" >
                        <Image className="logo-icon size-10 shrink-0 object-contain sm:size-12"
                        src='/logo.png' 
                        alt={`${APP_NAME}`}
                        height={400}
                        width={400}
                        priority={true}>
                        </Image>
                    </Link>
                    <p className="text-primary whitespace-nowrap" >{APP_NAME}</p>
                </div>
                <MenuSheet/>
            </div>
        </header>
    )
}

export default Header;
