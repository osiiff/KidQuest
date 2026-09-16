import { auth } from "@/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getDashboardSummary } from "@/lib/actions/subject.action";
import { formatCurrency, formatDateTime, formatNumber } from "@/lib/utils";
import { BadgeDollarSign, CreditCard, Users } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: 'Admin Dashboard'
}

const AdminOverviewPage = async () => {
    const session = await auth();

    if(session?.user?.role !== 'admin') {
        throw new Error('User is not admin')
    }

    const summary = await getDashboardSummary();


    return (
        <div className="space-y-2">
            <h1 className="hero-title text-4xl p-4">
                Dashboard
            </h1>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" >
                <Card className="border-2 border-rounded p-5">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        <BadgeDollarSign/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {formatCurrency(summary.totalRevenue || 0)}
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-2 border-rounded p-5">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
                        <CreditCard/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {formatNumber(summary.activeSubscriptionsCount)}
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-2 border-rounded p-5">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Users</CardTitle>
                        <Users/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {formatNumber(summary.usersCount)}
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4 border-2 border-rounded p-5">
                    <CardHeader>
                        <CardTitle>Overview</CardTitle>
                    </CardHeader>
                    <CardContent>

                    </CardContent>
                </Card>
                <Card className="col-span-3 border-2 border-rounded p-5">
                    <CardHeader>
                        <CardTitle>Recent Sales</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>BUYER</TableHead>
                                    <TableHead>DATE</TableHead>
                                    <TableHead>TOTAL</TableHead>
                                    <TableHead>ACTIONS</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {summary.latestSubscriptions.map((subscription) => (
                                    <TableRow key={subscription.id}>
                                        <TableCell>
                                            {subscription?.user?.name ? subscription.user.name : 'Deleted User'}
                                        </TableCell>
                                        <TableCell>
                                            {formatDateTime(subscription.createdAt).dateOnly}
                                        </TableCell>
                                        <TableCell>
                                            {formatCurrency(Number(subscription.price))}
                                        </TableCell>
                                        <TableCell>
                                            <Link href='/subscription'>
                                                <span className="px-2"> 
                                                    Details
                                                </span>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
 
export default AdminOverviewPage;