import { Task } from "@/types";
import TaskCard from "./tasks-card";

type TasksListProps = {
    data: Task[],
    limit?: number
}


const TasksList = ({data, limit}: TasksListProps) => {
    const limitedData = limit ? data.slice(0, limit) : data;
    return (
        <section className="mt-6 flex w-full flex-col gap-10">
            {data.length > 0 ? (
                <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                    {limitedData.map((task) => (
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