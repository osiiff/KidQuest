import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getMySubscriptions } from "@/lib/actions/subscription.actions";
import { formatDateTime } from "@/lib/utils";
import { Metadata } from "next";
import Link from "next/link";


export const metadata: Metadata = {
    title: 'My Subscriptions'
}

const SubscriptionsPage = async (props: {searchParams: Promise<{page: string}>}) => {

    const {page} = await props.searchParams;

    const subscriptions = await getMySubscriptions({
        page: Number(page) || 1,
    })
    
    return ( 
        <div className="space-y-2">
            <h2 className="hero-title text-4xl py-5">Subscriptions</h2>
            <div className="overflow-x-auto">
                <Table>
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
                                    <Link href='/subscription'>
                                    <span className="px-2">Details</span>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
     );
}
 
export default SubscriptionsPage;