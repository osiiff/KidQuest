import { Task } from "@/types";
import TaskCard from "./tasks-card";

type TasksListProps = {
    data: Task[],
}


const TasksList = ({data}: TasksListProps) => {
    return (
        <section className="mt-6 flex w-full flex-col gap-10">
            {data.length > 0 ? (
                <div className="grid w-full min-w-0 grid-cols-1 items-stretch gap-3 min-[360px]:grid-cols-2 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-6">
                    {data.map((task) => (
                        <TaskCard key={task.id} task={task}/>
                    ))}
                </div>
            ) : (
                <p>No exercises found</p>
            )}
               
    </section>
    )
}

export default TasksList;
