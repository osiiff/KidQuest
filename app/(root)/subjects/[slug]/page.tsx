import TasksList from "@/components/shared/subjects/tasks-list";
import { getSubjectBySlug } from "@/lib/actions/subject.action";
import { ArrowLeft, ChevronRight, HomeIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";


const SubjectPage = async (props: {params: Promise<{slug: string}>}) => {
    const {slug} = await props.params;

    const subject = await getSubjectBySlug(slug);

    if (!subject) notFound();

    return (
        <div className="hero flex">
            <div>
                <div className="flex justify-start w-full">
                    <div className="badge gap-1">
                        <HomeIcon/> <ChevronRight/>
                        <Link href='/subjects'>Subjects</Link>
                        <ChevronRight/>
                        <Link href={`/subjects/${subject.slug}`} >{subject.name}</Link>
                    </div>
                </div>
                <div className="flex justify-between w-full">
                    <div className="w-auto">
                        <Link href='/subjects' className="btn-secondary mt-6">
                            <ArrowLeft/>
                        </Link>
                    <p className="hero-title">{subject.name}</p>
                    <p className="hero-text">{subject.description}</p>
                    </div>
                     <div>
                        <Image className="hero-cat-image" src='/hero-cat3.png' alt="Cat" width={500} height={500}/>
                    </div>
                </div>
                <div>
                    <p className="hero-title text-4xl">Exercises</p>
                        <TasksList data={subject.tasks}/>
                </div>
            </div>
        </div>
    )
}

export default SubjectPage;