import { Star } from "lucide-react";
import { Metadata } from "next";
import CheckoutSteps from "@/components/shared/checkout-steps";


export const metadata:Metadata = {
    title: 'Select Your Plan'
}

const SubscriptionPage = () => {
    return (
        <>
        <CheckoutSteps current={0} />
        <div className="w-full my-4 border-rounded border-purple-200 border-2 bg-violet-100 p-6">
            <div className="flex justify-center">
                <div className="badge gap-2">
                    <Star/> Simple, fair and maid for kids
                </div>
            </div>
            <div className="flex-center flex-col gap-3">
                <div className="hero-title text-4xl">
                    Choose your learning plan
                </div>
                <div className="hero-text text-center">
                    Unlock new tasks and fun activities. Pick the plan that fits your child&apos;s journey!
                </div>
            </div>
        <SubscriptionPage/>

        </div>
        </>
    );
}

export default SubscriptionPage;