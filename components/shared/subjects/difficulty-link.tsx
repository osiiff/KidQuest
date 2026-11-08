'use client';

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const DifficultyLink = ({
    difficulty,
    className
}: {
    difficulty: string,
    className?: string
}) => {

    const pathname = usePathname();
    const searchParams = useSearchParams();

    const params = new URLSearchParams(searchParams.toString());

    if (difficulty === "all") {
        params.delete("difficulty");
    } else {
        params.set("difficulty", difficulty);
    }

    const query = params.toString();

    return (
        <Link
        href={query ? `${pathname}?${query}` : pathname}
        scroll={false}
        className={className}
        >
        {difficulty === "all" ? "All difficulties" : difficulty}
        </Link>
    );
}
 
export default DifficultyLink;