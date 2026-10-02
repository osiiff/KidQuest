import CreateSubjectForm from "@/components/admin/create-subject-form";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Create Subject'
}

const CreateSubject = () => {

    return (
        <div>
            <p className="hero-title text-4xl">Create Subject</p>
            <div>
                <CreateSubjectForm type="Create" />
            </div>
        </div>
    );
}
 
export default CreateSubject;