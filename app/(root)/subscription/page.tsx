import { Star } from "lucide-react";
import { Metadata } from "next";
import CheckoutSteps from "@/components/shared/checkout-steps";
import SubscriptionCard from "./subscription-card";


export const metadata:Metadata = {
    title: 'Select Your Plan'
}

const SubscriptionPage = () => {
    return (
        <>
        <div className="min-w-0 [&>div]:flex-wrap [&>div]:gap-y-3 [&_.nav-link]:max-w-full [&_.nav-link]:text-center">
            <CheckoutSteps current={0} />
        </div>
        <div className="my-4 w-full min-w-0 rounded-(--radius-2xl,40px) border-2 border-purple-200 bg-violet-100 p-3 sm:p-6 lg:p-8">
            <div className="flex min-w-0 justify-center">
                <div className="badge max-w-full gap-2 px-3 py-2 text-sm leading-snug wrap-anywhere sm:px-4 sm:text-base">
                    <Star className="size-5 shrink-0"/> Simple, fair and maid for kids
                </div>
            </div>
            <div className="my-6 flex min-w-0 flex-col items-center gap-3 text-center sm:my-8">
                <div className="w-full min-w-0 text-2xl leading-tight font-extrabold tracking-[-0.055em] text-[#29276f] wrap-anywhere sm:text-3xl lg:text-4xl">
                    Choose your learning plan
                </div>
                <div className="w-full min-w-0 text-base leading-relaxed font-medium text-(--muted) wrap-anywhere sm:text-lg">
                    Unlock new tasks and fun activities. Pick the plan that fits your child&apos;s journey!
                </div>
            </div>
        <SubscriptionCard/>

        </div>
        </>
    );
}

export default SubscriptionPage;
