import TaskCard from "./tasks-card";
import { SubjectWithTasks } from "@/types";

type TasksListProps = {
    data: SubjectWithTasks[];
}


const TasksList = ({data}: TasksListProps ) => {
    return (
        <section className="mt-6 flex w-full flex-col gap-10">
            {data.length > 0 ? (
                data.map((subject) => (
                    <div key={subject.slug} className="w-auto">
                        <h2 className="subject-title">{subject.name}</h2>
                            <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3 md:gap-4 lg:grid-cols-4 xl:grid-cols-6">
                                {subject.tasks.map((task) => (
                                <TaskCard key={task.slug} task={task} />
                                    ))}
                            </div>
                    </div>
        ))
      ) : (
        <p>No subjects found</p>
      )}
    </section>
    )
}

export default TasksList;