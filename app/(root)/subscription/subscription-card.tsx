'use client';

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { createUserSubscription } from "@/lib/actions/subscription.actions";
import { SUBSCRIPTION_PLANS } from "@/lib/constants";
import { subscriptionPlanSchema } from "@/lib/validators";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import z from "zod";


const SubscriptionCard = () => {
    const router = useRouter();

    const [isPending, startTransition] = useTransition();

    const onChoose = async (values: z.infer<typeof subscriptionPlanSchema>) => {
        startTransition(async () => {
            const result = await createUserSubscription(values);

             if(!result.success) {
             toast.error(result.message);
             return;   
            };

            router.push('/payment-method')
        })
    }



    return (
        <div className="grid min-w-0 grid-cols-1 items-stretch gap-4 sm:grid-cols-[repeat(auto-fit,minmax(min(100%,16rem),1fr))] sm:gap-6">
                {SUBSCRIPTION_PLANS.map((subscription) => (
                    <div key={subscription.value} className="flex min-w-0 items-stretch">
                        <Card className="flex w-full min-w-0 flex-col rounded-(--radius-2xl,40px) bg-white p-3 sm:p-5">
                            <CardHeader className="flex min-w-0 flex-col items-center justify-center gap-2 px-0 text-center">
                                <p className="w-full min-w-0 text-2xl leading-tight font-extrabold tracking-[-0.055em] text-primary wrap-anywhere sm:text-3xl">{subscription.title}</p>
                                <p className="w-full min-w-0 text-base leading-relaxed font-medium text-(--muted) wrap-anywhere">{subscription.description}</p>
                            </CardHeader>
                            <CardContent className="flex min-w-0 flex-1 flex-col gap-5 px-0 pt-5">
                                <div className="flex min-w-0 flex-wrap items-baseline justify-center gap-x-1 gap-y-1 text-center">
                                    <p className="text-3xl leading-tight font-medium text-mint">${subscription.price}</p>
                                    <p className="min-w-0 text-base leading-relaxed font-medium text-(--muted) wrap-anywhere">/ {subscription.duration}</p>
                                </div>
                                <div className="flex min-w-0 flex-col gap-3">
                                    {subscription.features.map((feature) => (
                                    <div key={feature} className="flex min-w-0 items-start gap-2 text-base leading-relaxed font-medium text-(--muted)">
                                        <Check className="mt-1 size-5 shrink-0 text-mint"/>
                                        <span className="min-w-0 wrap-anywhere">{feature}</span>
                                    </div>
                                ))}
                                </div>
                                <div className="mt-auto flex w-full min-w-0 justify-center pt-1">
                                    <button className='btn-primary pastel-mint min-h-12 w-full min-w-0 px-3 py-3 text-base leading-snug whitespace-normal text-teal-600 wrap-anywhere sm:px-4' disabled={isPending} onClick={() => onChoose({
                                        plan: subscription.value,
                                    })}>
                                   {subscription.buttonText}
                                    </button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </div>
    )
}

export default SubscriptionCard;
