'use client';

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
    {
        title: 'Home',
        href: '/',
    },
    {
        title: "Subjects",
        href: "/subjects",
    },
    {
        title: "About",
        href: "/about",
    },
]

const MenuSteps = () => {
    const pathname = usePathname();
    return (
        <nav className="nav">
            {links.map((link) => {
                const isActive = 
                link.href === '/' 
                ? pathname === '/'
                : pathname.startsWith(link.href);

                return (
                    <Link key={link.href}
                    href={link.href}
                    className={cn('nav-link', isActive && 'nav-link-active')}>
                        {link.title}
                    </Link>
                )
            })}
        </nav>
    )
}

export default MenuSteps;