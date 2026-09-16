import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: 'Unauthorized Access'
}

const Unauthorized = () => {
    return (
        <div className="container mx-auto flex flex-col items-center justify-center space-y-4 h-[calc(100vh)]">
            <h1 className="hero-title"> 
                Unauthorized Access
            </h1>
            <p className="hero-text">
                You do not have permission to access this page
            </p>
            <button className="btn-primary">
                <Link href='/'>
                Return Home
                </Link>
            </button>
        </div>
    );
}
 
export default Unauthorized;