import Link from "next/link";

const Login = () => {
    return (
        <nav className="nav">
            <Link href='/sign-in' className="btn-secondary">
                Sign In
            </Link>
            <Link href='/signup' className="btn-primary">
                Sign Up
            </Link>
        </nav>
    )
}

export default Login;