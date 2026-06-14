import { useFormStatus } from "react-dom";


const SignInButton = () => {
        const { pending } = useFormStatus();

        return (
            <button disabled={pending} className="w-full btn-primary">
                { pending ? 'Signing in...' : 'Sign in' }
            </button>
        )
}

export default SignInButton;