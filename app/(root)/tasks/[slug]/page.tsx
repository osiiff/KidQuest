import { getTaskBySlug } from "@/lib/actions/subject.action";
import { notFound } from "next/navigation";
import { Dot, HomeIcon } from "lucide-react";
import Link from "next/link";
import TaskQuiz from "@/components/shared/tasks/task-quiz";
import Image from "next/image";


const TaskPage = async (props: {params: Promise<{slug: string}>}) => {
    const {slug} = await props.params;

    const task = await getTaskBySlug(slug);
    
    if (!task) notFound();



    return (
        <div className="relative flex w-full min-w-0 flex-col gap-4 bg-[linear-gradient(110deg,#ffffff_0%,#f8fbff_48%,#f4efff_100%)] py-6 sm:gap-6 sm:px-4 sm:py-8 lg:px-6 lg:py-10 xl:px-8">
            
            <nav aria-label="Breadcrumb" className="w-full min-w-0">
                <div className="w-fit max-w-full rounded-2xl bg-white p-2 text-sm text-primary shadow-2xs sm:p-2.5 sm:text-base">
                    <Link href={`/subjects/${task.subject.slug}`} className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 [overflow-wrap:anywhere]">
                        <HomeIcon className="size-5 shrink-0"/>
                        <p className="min-w-0 max-w-full">{task.subject.name}</p>
                        <Dot className="size-5 shrink-0"/>
                        <p className="min-w-0 max-w-full">{task.title}</p>
                    </Link>
                </div>
                
            </nav>
            <Image src='/questions-cat.png' alt="" aria-hidden="true" width={1000} height={1000} className="hidden h-auto w-32 self-center object-contain lg:block xl:w-40"/>
            <TaskQuiz questions={task.questions}/>
            <div aria-hidden="true" className="hidden w-full items-center justify-between sm:flex">
                <Image src='/star_no_background_cropped.png' alt="" width={200} height={300} className="h-auto w-10 object-contain lg:w-14" />
                <Image src='/star_no_background_cropped.png' alt="" width={200} height={300} className="h-auto w-10 object-contain lg:w-14" />
            </div>
        </div>
    )
}

export default TaskPage;
