'use client';

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SheetClose } from "@/components/ui/sheet";

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

const MenuSteps = ({ inSheet = false }: { inSheet?: boolean }) => {
    const pathname = usePathname();
    return (
        <nav className={inSheet ? "flex flex-col gap-2" : "nav"}>
            {links.map((link) => {
                const isActive = 
                link.href === '/' 
                ? pathname === '/'
                : pathname.startsWith(link.href);

                const item = (
                    <Link key={link.href}
                    href={link.href}
                    className={cn('nav-link', isActive && 'nav-link-active')}>
                        {link.title}
                    </Link>
                );

                return inSheet ? (
                    <SheetClose key={link.href} asChild>{item}</SheetClose>
                ) : (
                    item
                );
            })}
        </nav>
    )
}

export default MenuSteps;
