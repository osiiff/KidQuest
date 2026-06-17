"use client";   

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { signUpDefoltValues } from "@/lib/constants";
import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import SignUpButton from "./sign-up-button";
import { signUpUser } from "@/lib/actions/user.actions";


const SignUpForm = () => {
    const [ data, action ] = useActionState(signUpUser, {
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
                    <Label htmlFor="name" className="text-primary">
                        Name
                    </Label>
                    <Input 
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    className="border-2 border-primary border-rounded"
                    defaultValue={signUpDefoltValues.name}/>
                </div>
                <div>
                    <Label htmlFor="email" className="text-primary">
                        Email
                    </Label>
                    <Input 
                    id="email"
                    name="email"
                    type="text"
                    autoComplete="email"
                    className="border-2 border-primary border-rounded"
                    defaultValue={signUpDefoltValues.email}/>
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
                    defaultValue={signUpDefoltValues.password}/>
                </div>
                <div>
                    <Label htmlFor="confirmPassword" className="text-primary">
                        Confirm Password
                    </Label>
                    <Input 
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    className="border-2 border-rounded"
                    required 
                    autoComplete="confirmPassword"
                    defaultValue={signUpDefoltValues.confirmPassword}/>
                </div>
                <div>
                    <SignUpButton/>
                </div>

                { data && !data.success && (
                    <div className="text-center text-red-500">
                        {data.message}
                    </div>
                ) }

                <div className="text-sm hero-text flex justify-center">
                    Already have an account? {'  '}
                    <Link href='/sign-in' target="_self" className="underline">Sign In</Link>
                </div>
            </div>
        </form>
    )
}

export default SignUpForm;