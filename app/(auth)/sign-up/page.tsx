import { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { APP_NAME } from "@/lib/constants";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import SignUpForm from "./sign-up-form";

export const metadata: Metadata = {
    title: 'Sign in',
}


const SignUpPage = async (props: {
    searchParams: Promise<{
        callbackUrl: string
    }>
}) => {
    const { callbackUrl } = await props.searchParams;
    const session = await auth();

    if (session) {
        return redirect(callbackUrl || '/');
    }

    return (
        <div className="w-full max-w-md border-rounded border-2 bg-white">
            <Card className="p-3">
                <CardHeader className="flex-center w-full">
                    <Link href='/' className="flex-center">
                        <Image src='/favicon.ico' alt={`${APP_NAME} logo`} width={50} height={50} className="logo-icon"/>
                    </Link>
                    <CardTitle className="hero-title text-5xl font-extrabold">Create account</CardTitle>
                    <CardDescription className="text-primary font-semibold justify-center flex">Enter your information below to sign up</CardDescription>
                </CardHeader>
                <CardContent>
                    <SignUpForm/>
                </CardContent>
            </Card>
        </div>
    )
}

export default SignUpPage;