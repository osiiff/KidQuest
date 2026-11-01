import { auth } from "@/auth";
import { requireAdmin } from "@/auth-guard";
import DeleteDialog from "@/components/shared/delete-dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { deleteSubscription, getAllSubscriptions } from "@/lib/actions/subscription.actions";
import { formatDateTime } from "@/lib/utils";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: 'Admin Subscriptions'
}

const AdminSubscriptionsPage = async (props: {
    searchParams: Promise<{query: string}>
}) => {
    await requireAdmin();

    const {query: searchText} = await props.searchParams;

    const session = await auth();

    if (!session?.user) {
        redirect('/sign-in');
        }
    
        if (session?.user?.role !== 'admin') {
        redirect('/');
        }

    const subscriptions = await getAllSubscriptions({
        query: searchText
    });

    return (
        <div className="space-y-2">
            <div className="flex items-center gap-3 my-4">
                    <h1 className="hero-title text-4xl m-0">Subscriptions</h1>
                    {searchText && (
                        <div>
                            Filtered by <i>&quot;{searchText}&quot;</i>{' '}
                            <Link href='/admin/subscriptions'>
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
                            <TableHead>PLAN</TableHead>
                            <TableHead>BUYER</TableHead>
                            <TableHead>START DATE</TableHead>
                            <TableHead>END DATE</TableHead>
                            <TableHead>STATUS</TableHead>
                            <TableHead>ACTIONS</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {subscriptions.data.map((subscription) => (
                            <TableRow key={subscription.id}>
                                <TableCell>{subscription.id}</TableCell>
                                <TableCell>{subscription.plan}</TableCell>
                                <TableCell>{subscription.user.name}</TableCell>
                                <TableCell>{subscription.startDate ? formatDateTime(subscription.startDate).dateTime : '—'}</TableCell>
                                <TableCell>{subscription.endDate ? formatDateTime(subscription.endDate).dateTime : '—'}</TableCell>
                                <TableCell>{subscription.status}</TableCell>
                                <TableCell>
                                    <button className="btn-primary">
                                        <Link href='/subscription'>
                                            Details
                                        </Link>
                                    </button>
                                    <DeleteDialog id={subscription.id} action={deleteSubscription}/>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
 
export default AdminSubscriptionsPage;