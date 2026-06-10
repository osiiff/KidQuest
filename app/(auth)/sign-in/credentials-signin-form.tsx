import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { signInDefoltValues } from "@/lib/constants";

const CredentialsSignInForms = () => {
    return (
        <form>
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
                    className="border-2 border-primary"
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
                    className="border-rounded! border-2 border-primary"
                    required 
                    autoComplete="password"
                    defaultValue={signInDefoltValues.password}/>
                </div>
                <div>
                    <button className="btn-primary w-full">
                        Sign In
                    </button>
                </div>
                <div className="text-sm hero-text flex justify-center">
                    Don&apos;t have account? {'  '}
                    <Link href='/sign-up' target="_self" className="link">Sign Up</Link>
                </div>
            </div>
        </form>
    )
}

export default CredentialsSignInForms;