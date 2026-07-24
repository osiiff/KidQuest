import { Metadata } from "next";
import PaymentMethodForm from "./payment-method-form";
import { auth } from "@/auth";
import { getUserById } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import CheckoutSteps from "@/components/shared/checkout-steps";

export const metadata:Metadata = {
    title: 'Select Payment method'
}

const PaymentMethodPage = async () => {
    const session = await auth();
    const userId = session?.user?.id;

    if(!userId) {
        redirect("/sign-in?callbackUrl=/payment-method")
    }

    const user = await getUserById(userId);

    return (
        <>
        <CheckoutSteps current={1} />
        <PaymentMethodForm  preferredPaymentMethod={user.paymentMethod}/>
        </>
    )
}

export default PaymentMethodPage;