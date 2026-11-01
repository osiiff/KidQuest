'use client';

import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Input } from "../ui/input";


const AdminSearch = () => {

    const pathname = usePathname();
    const formActionUrl = pathname.includes('/admin/subscriptions') 
    ? '/admin/subscriptions'
    : pathname.includes('/admin/users')
    ? '/admin/users'
    : '/admin/tasks';

    const searchParams = useSearchParams();
    const [queryValue, setQueryValue] = useState(
        () => searchParams.get('query') || ''
    );

    

    return (
        <form action={formActionUrl} method="GET">
            <Input
            type="search"
            placeholder="Search..."
            name="query"
            value={queryValue}
            onChange={(e) => setQueryValue(e.target.value)}
            className="md:w-24 lg:w-72 border-rounded border-2"
            />
            <button className="sr-only" type="submit">
                Search
            </button>
        </form>
    );
}
 
export default AdminSearch;