'use client';

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type ChoosingAgeSelectProps = {
    ageGroups: string[];
};

export const ChoosingAgeSelect = ({ageGroups}: ChoosingAgeSelectProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handleAgeChange = (ageGroup: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if(ageGroup === 'all') {
            params.delete('ageGroup');
        } else {
            params.set('ageGroup', ageGroup)
        }

        const query = params.toString();

        router.replace(query ? `${pathname}?${query}` : pathname, {
            scroll: false
        })
    }

return (
    <section className="p-3 flex align-super">
                <div className="info-panel w-xs">
                    <p className="logo">Choose age</p>
                    <Select value={searchParams.get('ageGroup') ?? 'all'} onValueChange={handleAgeChange}>
                        <SelectTrigger className="w-auto subject-text bg-white border-rounded">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent position="popper" className="bg-white border-rounded">
                            <SelectGroup className="border-rounded">
                                <SelectItem value="all" className="subject-text">All ages</SelectItem>
                                {ageGroups.map((ageGroup) => (
                                    <SelectItem value={ageGroup} key={ageGroup} className="subject-text">{ageGroup}</SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
        </section>
)}