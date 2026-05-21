import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";


type Task = {
    title: string;
    slug: string;
    image: string;
}

type TaskCardProps = {
  task: Task;
};

const TaskCard = ({task}: TaskCardProps) => {
    return (
        <Card className="subject-card ">
            <Link href={`/tasks/${task.slug}`} className="flex flex-col gap-3">
                <Image src={task.image} alt={task.title} width={100} height={50} className="object-cover"/>
                <p className="subject-title">{task.title}</p>
            </Link>
        </Card>
    )
}

export default TaskCard;