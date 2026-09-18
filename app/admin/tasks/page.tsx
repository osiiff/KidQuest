import { getAllSubjects } from "@/lib/actions/subject.action";

const AdminTasksPage = async (props: {
    searchParams: Promise<{
        query: string,
        subject: string,
        task: string,
        question: string
    }>
}) => {

    const searchParams = await props.searchParams;

    const searchText = searchParams.query || '';
    const subject = searchParams.subject || '';
    const task = searchParams.task || '';
    const question = searchParams.question || '';

    const tasks = await getAllSubjects({
        query: searchText,
        subject,
        task,
        question
    });

    return (
        <div className="space-y-2">
            <div>
                <p className="hero-title text-4xl">Tasks</p>
            </div>
        </div>
    );
}
 
export default AdminTasksPage;