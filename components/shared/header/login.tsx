import Link from "next/link";
import ModeToggle from "./mode-toggle";

const Login = () => {
    return (
        <nav className="nav">
            <ModeToggle/>
            <Link href='/login' className="btn-secondary">
                Log In
            </Link>
            <Link href='/signup' className="btn-primary">
                Sign Up
            </Link>
        </nav>
    )
}

export default Login;