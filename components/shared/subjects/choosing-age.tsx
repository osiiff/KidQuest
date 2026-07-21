
import { prisma } from "@/lib/prisma";
import { ChoosingAgeSelect } from "./choosing-age-select";


const ChoosingAge = async () => {
    const tasks = await prisma.task.findMany({
        select: {
            ageGroup: true,
        }   
    })

    const ageGroups = Array.from(new Set(tasks.map((task) => task.ageGroup)));




    return (
        <ChoosingAgeSelect ageGroups={ageGroups}/>
    )
}

export default ChoosingAge;