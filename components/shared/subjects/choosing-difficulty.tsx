import { prisma } from "@/lib/prisma";
import Link from "next/link";


const ChoosingDifficulty = async () => {
    const tasks = await prisma.task.findMany({
                select: {
                    id: true,
                    slug: true,
                    difficulty: true,
                }   
            })

    const difficulties = Array.from(new Set(tasks.map((task) => task.difficulty)));
    
    return (
        <section className="p-3 flex align-super">
            <div className="info-panel w-xs">
                <p className="logo">Choose difficulty</p>
                {difficulties.map((difficulty) => (
                    <Link href={difficulty} key={difficulty} className={(difficulty === 'beginner' ? 'btn-secondary pastel-mint' : difficulty === 'medium' ? 'btn-secondary pastel-yellow' : 'btn-secondary pastel-pink') }>
                        {difficulty}
                    </Link>
                ))}
            </div>
        </section>
    )
}

export default ChoosingDifficulty;