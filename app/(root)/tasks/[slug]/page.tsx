import { getTaskBySlug } from "@/lib/actions/subject.action";
import { notFound } from "next/navigation";
import { Dot, Book } from "lucide-react";
import Link from "next/link";
import TaskQuiz from "@/components/shared/tasks/TaskQuiz";


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
                <div>
                    <p className="font-medium">Question 1 of {task.questions.length}</p>
                </div>
            </div>
            <TaskQuiz questions={task.questions}/>
        </div>
    )
}

export default TaskPage;