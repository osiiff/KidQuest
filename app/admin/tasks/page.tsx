import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getAllSubjects } from "@/lib/actions/subject.action";
import Link from "next/link";

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

    const subjects = await getAllSubjects({
        query: searchText,
        subject,
        task,
        question
    });

    return (
        <div className="space-y-2 py-4">
            <div className="flex-between">
                <p className="hero-title text-4xl">Tasks</p>
                <button className="btn-primary">
                    <Link href='/admin/tasks/create'>
                    Create New Task
                    </Link>
                </button>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>TITLE</TableHead>
                        <TableHead >SUBJECT</TableHead>
                        <TableHead>DIFFICULTY</TableHead>
                        <TableHead>AGE GROUP</TableHead>
                        <TableHead className="w-24">ACTIONS</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {subjects.flatMap((subject) => 
                        subject.tasks.map((task) => (
                        <TableRow key={task.id}>
                            <TableCell>{task.id}</TableCell>
                            <TableCell>{task.title}</TableCell>
                            <TableCell >{subject.name}</TableCell>
                            <TableCell>{task.difficulty}</TableCell>
                            <TableCell>{task.ageGroup}</TableCell>
                            <TableCell>
                                <button className="btn-secondary" >
                                    <Link href={`/admin/tasks/${task.id}`}>
                                    Edit
                                    </Link>
                                </button>
                            </TableCell>
                        </TableRow>
                            ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
 
export default AdminTasksPage;