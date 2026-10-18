import CreateSubjectForm from "@/components/admin/create-subject-form";
import { getSubjectById } from "@/lib/actions/subject.action";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
    title: 'Update Subject'
}

const AdminUpdateSubjectPage = async (props: {
    params: Promise<{
        subjectId: string
    }>
}) => {
    const {subjectId} = await props.params;

    const subject = await getSubjectById(subjectId);

    if(!subject) return notFound();

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            <h1 className="hero-title text-4xl">Update Subject</h1>
            <CreateSubjectForm type="Update" subject={subject} subjectId={subject.id} />
        </div>
    );
}
 
export default AdminUpdateSubjectPage;