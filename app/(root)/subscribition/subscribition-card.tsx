import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const SubscribitionCard = () => {
    return (
        <div className="flex flex-row justify-center gap-4 p-4">
            <Card className="border-rounded border-2 flex flex-start flex-col h-auto p-6 gap-3 bg-white w-2xs">
                <CardHeader className="w-full flex-center">
                    <CardTitle className="text-mint text-4xl flex">1 Month</CardTitle>
                    <CardDescription className="text-mint text-xl">Start learning with fun tasks and rewards.</CardDescription>
                </CardHeader>
                <CardContent className="w-full flex-center">
                    <Link href='/' className="btn-primary pastel-mint text-teal-600">$5.00/mo</Link>
                </CardContent>
            </Card>
            <Card className="border-rounded border-2 flex justify-center flex-col h-auto p-6 gap-3 bg-white w-2xs">
                <CardHeader className="w-full flex-center">
                    <CardTitle className="text-mint text-4xl flex">3 Month</CardTitle>
                    <CardDescription className="text-mint text-xl">Build a steady learning habit.</CardDescription>
                </CardHeader>
                <CardContent className="w-full flex-center">
                    <Link href='/' className="btn-primary pastel-mint text-teal-600">$4.00/mo</Link>
                </CardContent>
            </Card>
            <Card className="border-rounded border-2 flex justify-end flex-col h-auto p-6 gap-3 bg-white w-2xs">
                <CardHeader className="w-full flex-center">
                    <CardTitle className="text-pink text-4xl flex">1 Year</CardTitle>
                    <CardDescription className="text-pink text-xl">Best value for long-term learning.</CardDescription>
                </CardHeader>
                <CardContent className="w-full flex-center">
                    <Link href='/' className="btn-primary pastel-pink text-pink-500">$45.00/year</Link>
                </CardContent>
            </Card>
        </div>
    )
}

export default SubscribitionCard;