import Link from "next/link";
import Image from "next/image";
import { APP_NAME } from "@/lib/constants";
import { Heart } from "lucide-react";
import { Star } from "lucide-react";
import { Puzzle } from "lucide-react";


const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="footer" >
            <div className="footer-grid" >
            <div className="flex-col" >
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

                <p className="footer-text" >A playful learning platform where kids explore, 
                    learn and grow every day</p>

                <div className="footer-socials">
                    <Link href="#" className="footer-social flex-center">
                        <Star/>
                    </Link>
                    <Link href="#" className="footer-social flex-center">
                        <Heart/>
                    </Link>
                    <Link href="#" className="footer-social flex-center">
                        <Puzzle/>
                    </Link>
                </div>

            </div>

                <div className="footer-column" >
                    <h1 className="text-primary" >Learning</h1>
                    <div className="footer-links" >
                        <Link href='/subjects' className="footer-link">Subjects</Link>
                        <Link href='/math'className="footer-link" >Math</Link>
                        <Link href='/english' className="footer-link">English</Link>
                        <Link href='/reading' className="footer-link" >Reading</Link>
                    </div>
                </div>

                <div  className="footer-column">
                    <h1  className="text-primary">{APP_NAME}</h1>
                    <div className="footer-links" >
                        <Link href='/about' className="footer-link" >About</Link>
                        <Link href='/rewards' className="footer-link">Rewards</Link>
                        <Link href='/progress' className="footer-link">Progress</Link>
                    </div>
                </div>

                <div  className="footer-column">
                    <h1 className="text-primary">For parents</h1>
                    <div className="footer-links" >
                        <Link href='/safety' className="footer-link">Safety</Link>
                        <Link href='/privacy' className="footer-link">Privacy</Link>
                        <Link href='/terms' className="footer-link">Terms</Link>
                    </div>
                </div>
                <div className="border-t flex-start" >
                    <Heart className="text-primary"/>
                    <p className="text-primary" >{currentYear} {APP_NAME}</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;