import { APP_NAME } from "@/lib/constants";
import { Heart } from "lucide-react";


const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="footer" >
            <div className="flex justify-center gap-1">
                <Heart className="text-primary"/>
                <p className="text-primary" >{currentYear} {APP_NAME}</p>
            </div>
        </footer>
    )
}

export default Footer;