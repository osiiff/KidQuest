import { useFormStatus } from "react-dom";


const SignUpButton = () => {
        const { pending } = useFormStatus();

        return (
            <button disabled={pending} className="w-full btn-primary">
                { pending ? 'Signing up...' : 'Sign up' }
            </button>
        )
}

export default SignUpButton;