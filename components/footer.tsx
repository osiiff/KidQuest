import Link from "next/link";
import Image from "next/image";
import { APP_NAME } from "@/lib/constants";



const Footer = () => {
    return (
        <footer className="footer" >
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
        </footer>
    )
}

export default Footer;