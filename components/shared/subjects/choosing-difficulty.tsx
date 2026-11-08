import { prisma } from "@/lib/prisma";
import DifficultyLink from "./difficulty-link";


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
                <DifficultyLink difficulty="all" className="btn-primary" />
                {difficulties.map((difficulty) => (
                    <DifficultyLink key={difficulty} difficulty={difficulty} className={(difficulty === 'beginner' ? 'btn-secondary pastel-mint' : difficulty === 'medium' ? 'btn-secondary pastel-yellow' : 'btn-secondary pastel-pink') }/>
                ))}
            </div>
        </section>
    )
}

export default ChoosingDifficulty;