import { getUserById } from "@/lib/actions/user.actions";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import AdminUpdateUserForm from "./update-user-form";

export const metadata: Metadata = {
    title: 'Update User'
}

const AdminUserUpdatePage = async (props: {
    params: Promise<{
        id: string
    }>
}) => {

    const {id} = await props.params;

    const user = await getUserById(id);

    if(!user) notFound();

    return (
        <div className="space-y-8 mx-auto">
            <h1 className="hero-title text-4xl">Update User</h1>
            <AdminUpdateUserForm user={user}/>
        </div>
    );
}
 
export default AdminUserUpdatePage;