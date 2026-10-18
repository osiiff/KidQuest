import CreateTaskForm from "@/components/admin/create-task-form";
import { getTaskById } from "@/lib/actions/subject.action";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
    title: 'Update Task'
}

const AdminUpdateTaskPage = async (props: {
    params: Promise<{
        taskId: string
    }>
}) => {
    const {taskId} = await props.params;

    const task = await getTaskById(taskId);

    if(!task) return notFound();

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            <h1 className="hero-title text-4xl">Update Task</h1>
            <CreateTaskForm type="Update" task={task} taskId={task.id}/>
        </div>
    );
}
 
export default AdminUpdateTaskPage;