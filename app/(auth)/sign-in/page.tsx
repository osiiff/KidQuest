import { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { APP_NAME } from "@/lib/constants";

export const metadata: Metadata = {
    title: 'Sign in',
}


const SignInPage = () => {
    return (
        <div className="w-full max-w-md border-rounded border-2 bg-[radial-gradient(circle_at_78%_35%,rgba(139,124,246,0.22),transparent_34%),radial-gradient(circle_at_88%_80%,rgba(255,142,209,0.14),transparent_28%),radial-gradient(circle_at_15%_20%,rgba(85,214,202,0.12),transparent_30%),linear-gradient(110deg,#ffffff_0%,#f8fbff_48%,#f4efff_100%)]">
            <Card className="p-3">
                <CardHeader className="flex-center w-full">
                    <Link href='/' className="flex-center">
                        <Image src='/favicon.ico' alt={`${APP_NAME} logo`} width={50} height={50} className="logo-icon"/>
                    </Link>
                    <CardTitle className="hero-title text-5xl font-extrabold">Welcome back!</CardTitle>
                    <CardDescription className="text-primary font-semibold justify-center flex">Log in to continue your learning adventure</CardDescription>
                </CardHeader>
                <CardContent>

                </CardContent>
            </Card>
        </div>
    )
}

export default SignInPage;