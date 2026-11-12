import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getMySubscriptions } from "@/lib/actions/subscription.actions";
import { formatDateTime } from "@/lib/utils";
import { Metadata } from "next";
import Link from "next/link";


export const metadata: Metadata = {
    title: 'My Subscriptions'
}

const SubscriptionsPage = async () => {

    const subscriptions = await getMySubscriptions();
    const items = subscriptions.data.map((subscription) => ({
        ...subscription,
        startDateLabel: subscription.startDate ? formatDateTime(subscription.startDate).dateTime : '—',
        endDateLabel: subscription.endDate ? formatDateTime(subscription.endDate).dateTime : '—',
    }));
    
    return ( 
        <div className="w-full min-w-0 space-y-2">
            <h2 className="min-w-0 py-5 text-2xl leading-tight font-extrabold tracking-[-0.055em] text-[#29276f] wrap-anywhere sm:text-4xl">Subscriptions</h2>
            <div className="grid w-full min-w-0 grid-cols-1 gap-4 py-5 xl:hidden">
                {items.map((subscription) => (
                    <article key={subscription.id} className="flex min-w-0 flex-col gap-4 rounded-3xl border bg-white p-3 shadow-card sm:p-5">
                        <div className="flex min-w-0 flex-wrap items-start justify-between gap-2">
                            <h3 className="min-w-0 flex-1 text-lg leading-snug font-semibold text-primary wrap-anywhere">{subscription.plan}</h3>
                            <span className="max-w-full rounded-full bg-primary/10 px-3 py-1 text-sm leading-snug font-medium text-primary wrap-anywhere">{subscription.status}</span>
                        </div>
                        <dl className="flex min-w-0 flex-col gap-3 text-sm leading-relaxed">
                            <div className="min-w-0">
                                <dt className="font-medium text-(--muted)">ID</dt>
                                <dd className="min-w-0 whitespace-normal wrap-anywhere">{subscription.id}</dd>
                            </div>
                            <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2">
                                <div className="min-w-0">
                                    <dt className="font-medium text-(--muted)">START DATE</dt>
                                    <dd className="min-w-0 wrap-anywhere">{subscription.startDateLabel}</dd>
                                </div>
                                <div className="min-w-0">
                                    <dt className="font-medium text-(--muted)">END DATE</dt>
                                    <dd className="min-w-0 wrap-anywhere">{subscription.endDateLabel}</dd>
                                </div>
                            </div>
                            <div className="min-w-0">
                                <dt className="font-medium text-(--muted)">ACTIONS</dt>
                                <dd>
                                    <Link href='/subscription' className="inline-flex min-h-11 items-center rounded-xl px-2 text-sm font-medium text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">Details</Link>
                                </dd>
                            </div>
                        </dl>
                    </article>
                ))}
            </div>
            <div className="hidden w-full min-w-0 py-5 xl:block">
                <Table className="table-fixed [&_th]:whitespace-normal [&_td]:whitespace-normal [&_td]:wrap-anywhere">
                    <colgroup>
                        <col className="w-[24%]" />
                        <col className="w-[14%]" />
                        <col className="w-[20%]" />
                        <col className="w-[20%]" />
                        <col className="w-[13%]" />
                        <col className="w-[9%]" />
                    </colgroup>
                    <TableHeader>
                        <TableRow className="text-base leading-snug">
                            <TableHead>ID</TableHead>
                            <TableHead>PLAN</TableHead>
                            <TableHead>START DATE</TableHead>
                            <TableHead>END DATE</TableHead>
                            <TableHead>STATUS</TableHead>
                            <TableHead>ACTIONS</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {items.map((subscription) => (
                            <TableRow key={subscription.id}>
                                <TableCell>{subscription.id}</TableCell>
                                <TableCell>{subscription.plan}</TableCell>
                                <TableCell>{subscription.startDateLabel}</TableCell>
                                <TableCell>{subscription.endDateLabel}</TableCell>
                                <TableCell>{subscription.status}</TableCell>
                                <TableCell>
                                    <Link href='/subscription' className="inline-flex min-h-11 items-center rounded-xl text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
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
