"use client";   

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { signInDefoltValues } from "@/lib/constants";
import { useActionState } from "react";
import { signWithCredentials } from "@/lib/actions/user.actions";
import { useSearchParams } from "next/navigation";
import SignInButton from "./sign-in-button";

const CredentialsSignInForms = () => {
    const [ data, action ] = useActionState(signWithCredentials, {
        success: false,
        message: ''
    });

    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/';



    return (
        <form action={action}>
            <input type="hidden" name="callbackUrl" value={callbackUrl}></input>
            <div className="space-y-6">
                <div>
                    <Label htmlFor="email" className="text-primary">
                        Email
                    </Label>
                    <Input 
                    id="email"
                    name="email"
                    type="email"
                    required 
                    autoComplete="email"
                    className="border-2 border-primary border-rounded"
                    defaultValue={signInDefoltValues.email}/>
                </div>
                <div>
                    <Label htmlFor="password" className="text-primary">
                        Password
                    </Label>
                    <Input 
                    id="password"
                    name="password"
                    type="password"
                    className="border-2 border-primary border-rounded"
                    required 
                    autoComplete="password"
                    defaultValue={signInDefoltValues.password}/>
                </div>
                <div>
                    <SignInButton/>
                </div>

                { data && !data.success && (
                    <div className="text-center text-red-500">
                        {data.message}
                    </div>
                ) }

                <div className="text-sm hero-text flex justify-center">
                    Don&apos;t have account? {'  '}
                    <Link href='/sign-up' target="_self" className="underline">Sign Up</Link>
                </div>
            </div>
        </form>
    )
}

export default CredentialsSignInForms;