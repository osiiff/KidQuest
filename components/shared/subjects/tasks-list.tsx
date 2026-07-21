import { Task } from "@/types";
import TaskCard from "./tasks-card";

type TasksListProps = {
    data: Task[];
}


const TasksList = ({data}: TasksListProps ) => {
    return (
        <section className="mt-6 flex w-full flex-col gap-10">
            {data.length > 0 ? (
                <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
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