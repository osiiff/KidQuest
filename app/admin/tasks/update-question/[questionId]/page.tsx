import CreateQuestionForm from "@/components/admin/create-question-form";
import { getQuestionById } from "@/lib/actions/subject.action";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
    title: 'Update Question'
}

const AdminUpdateQuestionPage = async (props: {
    params: Promise<{
        questionId: string
    }>
}) => {
    const {questionId} = await props.params;

    const question = await getQuestionById(questionId);

    if(!question) return notFound();

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            <h1 className="hero-title text-4xl">Update Question</h1>
            <CreateQuestionForm type="Update" question={question} questionId={question.id}/>
        </div>
    );
}
 
export default AdminUpdateQuestionPage;