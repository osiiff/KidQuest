import Link from "next/link";


const Menu = () => {
    return (
        <div className="flex-center" >
            <nav className="nav" >
                <Link href='/' className="nav-link" >
                    Home
                </Link>
                <Link href='/subjects' className="nav-link" >
                    Subjects
                </Link>
                <Link href='/about' className="nav-link" >
                    About
                </Link>
            </nav>
        </div>
    )
}

export default Menu;