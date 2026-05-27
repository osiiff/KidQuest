import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Task } from "@/types";



type TaskCardProps = {
  task: Task;
};

const TaskCard = ({task}: TaskCardProps) => {
    return (
        <Card className="subject-card">
            <Link href={`/tasks/${task.slug}`} className="flex h-full w-full flex-col gap-3">
            <div className="relative w-full h-3/5 flex-1 overflow-hidden rounded-2xl">
                <Image src={task.image} alt={task.title} width={200} height={200} sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw" className="subject-icon"/>
            </div>
                <p className="subject-text">{task.title}</p>
            </Link>
        </Card>
    )
}

export default TaskCard;