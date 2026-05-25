"use client";

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ChoosingAge = () => {
    return (
        <section className="p-3 flex align-super">
            <div className="info-panel w-xs">
                <p className="logo">Choose age</p>
                <Select defaultValue="all">
                    <SelectTrigger className="w-auto subject-text bg-white border-rounded" >
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent position="popper" className="bg-white border-none border-rounded">
                        <SelectGroup className="border-rounded">
                            <SelectItem value="kindergarden" className="subject-text">Kindergarden</SelectItem>
                            <SelectItem value="early" className="subject-text ">Early Primary</SelectItem>
                            <SelectItem value="primary" className="subject-text">Primary School</SelectItem>
                            <SelectItem value="all" className="subject-text">All ages</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </section>
    )
}

export default ChoosingAge;