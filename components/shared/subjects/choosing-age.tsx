import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { prisma } from "@/lib/prisma";


const ChoosingAge = async () => {
    const tasks = await prisma.task.findMany({
        select: {
            ageGroup: true,
        }   
    })

    const ageGroups = Array.from(new Set(tasks.map((task) => task.ageGroup)));


    return (
        <section className="p-3 flex align-super">
                <div className="info-panel w-xs">
                    <p className="logo">Choose age</p>
                    <Select defaultValue="all">
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
    )
}

export default ChoosingAge;