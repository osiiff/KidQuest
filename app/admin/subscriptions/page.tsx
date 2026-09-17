import { auth } from "@/auth";
import { requireAdmin } from "@/auth-guard";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getAllSubscriptions } from "@/lib/actions/subscription.actions";
import { formatDateTime } from "@/lib/utils";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: 'Admin Subscriptions'
}

const AdminSubscriptionsPage = async () => {
    await requireAdmin();

    const session = await auth();

    if (!session?.user) {
        redirect('/sign-in');
        }
    
        if (session?.user?.role !== 'admin') {
        redirect('/');
        }

    const subscriptions = await getAllSubscriptions();

    return (
        <div className="space-y-2">
            <h2 className="hero-title text-4xl py-5">Subscriptions</h2>
            <div className="overflow-x-auto py-5">
                <Table >
                    <TableHeader>
                        <TableRow className="hero-text">
                            <TableHead>ID</TableHead>
                            <TableHead>PLAN</TableHead>
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
                                <TableCell>{subscription.startDate ? formatDateTime(subscription.startDate).dateTime : '—'}</TableCell>
                                <TableCell>{subscription.endDate ? formatDateTime(subscription.endDate).dateTime : '—'}</TableCell>
                                <TableCell>{subscription.status}</TableCell>
                                <TableCell>
                                    <button className="btn-primary">
                                        <Link href='/subscription'>
                                            Details
                                        </Link>
                                    </button>
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