import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Task } from "@/types";



type TaskCardProps = {
  task: Task;
};

const TaskCard = ({task}: TaskCardProps) => {
    // These source files have opaque black pixels outside their illustrated corners.
    const hasBlackCorners = /^\/tasks\/(?:english\/e-task[1-46]|reading\/r-task[1-6])\.png$/.test(task.image);

    return (
        <Card className="flex h-full min-w-0 flex-col rounded-[26px] bg-white p-2 shadow-card transition duration-200 hover:-translate-y-1.5 hover:shadow-[0_20px_42px_rgba(92,84,170,0.14)] sm:p-3 lg:p-4">
            <Link href={`/tasks/${task.slug}`} className="flex w-full min-w-0 flex-1 flex-col gap-2">
                <div className="relative aspect-square w-full shrink-0 overflow-hidden rounded-2xl">
                    <Image
                        src={task.image}
                        alt={task.title}
                        fill
                        sizes="(max-width: 359px) calc(100vw - 82px), (max-width: 639px) calc((100vw - 110px) / 2), (max-width: 1023px) 28vw, (max-width: 1279px) 21vw, 160px"
                        className={`rounded-2xl object-contain ${hasBlackCorners ? "scale-110" : ""}`}
                    />
                </div>
                <p className="min-w-0 wrap-break-word text-sm leading-snug font-medium text-(--muted) sm:text-base">{task.title}</p>
            </Link>
        </Card>
    )
}

export default TaskCard;
