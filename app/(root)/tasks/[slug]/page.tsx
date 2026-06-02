import { getTaskBySlug } from "@/lib/actions/subject.action";
import { notFound } from "next/navigation";
import { Dot, Book } from "lucide-react";
import Link from "next/link";
import TaskQuiz from "@/components/shared/tasks/task-quiz";
import Image from "next/image";


const TaskPage = async (props: {params: Promise<{slug: string}>}) => {
    const {slug} = await props.params;

    const task = await getTaskBySlug(slug);
    
    if (!task) notFound();



    return (
        <div className="hero flex flex-col">
            
            <div className="flex-between w-full">
                <div className="gap-2 text-primary bg-white border-rounded shadow-2xs p-2.5">
                    <Link href='/subjects' className="flex flex-row ">
                        <Book/>
                        <p>{task.subject.name}</p>
                        <Dot/>
                        <p>{task.title}</p>
                    </Link>
                </div>
                
            </div>
            <Image src='/questions-cat.png' alt="Cat" width={1000} height={1000} className="w-3xs flex absolute left-4 top-30"/>
            <TaskQuiz questions={task.questions}/>
            <Image src='/star_no_background_cropped.png' alt="star" width={200} height={300} className="floating-item" />
            <Image src='/star_no_background_cropped.png' alt="star" width={200} height={300} className="floating-item" />
        </div>
    )
}

export default TaskPage;