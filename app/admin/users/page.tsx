import DeleteDialog from "@/components/shared/delete-dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { deleteUser, getAllUsers } from "@/lib/actions/user.actions";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: 'Admin Users'
}

const AdminUsersPage = async () => {
    const users = await getAllUsers();
    return (
        <div className="space-y-2">
            <h2 className="hero-title text-4xl py-5">Subscriptions</h2>
            <div className="overflow-x-auto py-5">
                <Table >
                    <TableHeader>
                        <TableRow className="hero-text">
                            <TableHead>ID</TableHead>
                            <TableHead>NAME</TableHead>
                            <TableHead>EMAIL</TableHead>
                            <TableHead>ROLE</TableHead>
                            <TableHead>ACTIONS</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.data.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.role === 'user' ? (
                                    <p className="badge bg-secondary">User</p>
                                ): (
                                    <p className="badge bg-primary text-white">Admin</p>
                                )}</TableCell>
                                <TableCell>
                                    <button className="btn-primary">
                                        <Link href={`/admin/users/${user.id}`}>
                                            Edit
                                        </Link>
                                    </button>
                                    <DeleteDialog id={user.id} action={deleteUser}/>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
 
export default AdminUsersPage;