import DeleteDialog from "@/components/shared/delete-dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { deleteUser, getAllUsers } from "@/lib/actions/user.actions";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: 'Admin Users'
}

const AdminUsersPage = async (props: {
    searchParams: Promise<{
        query: string
    }>
}) => {
    const {query: searchText} = await props.searchParams;

    const users = await getAllUsers({query: searchText});
    return (
        <div className="space-y-2">
            <div className="flex items-center gap-3 my-4">
                    <h1 className="hero-title text-4xl m-0">Users</h1>
                    {searchText && (
                        <div>
                            Filtered by <i>&quot;{searchText}&quot;</i>{' '}
                            <Link href='/admin/users'>
                            <button className="btn-secondary">
                                Remove Filter
                            </button>
                            </Link>
                        </div>
                    )}
                </div>
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