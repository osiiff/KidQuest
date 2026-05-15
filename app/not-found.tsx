import Link from "next/link";


const NotFoundPage = () => {
    return (
        <div className="min-h-screen flex-center flex-col">
            <p className="hero-title">Page Not Found</p>
            <Link className="btn-primary" href='/'>Go To Home Page</Link>
        </div>
    )
}

export default NotFoundPage;