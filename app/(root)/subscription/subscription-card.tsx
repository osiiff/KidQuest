'use client';

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { createUserSubscription } from "@/lib/actions/user.actions";
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
        <div className="grid grid-cols-3 gap-6">
                {SUBSCRIPTION_PLANS.map((subscription) => (
                    <div key={subscription.value} className="my-4 flex items-stretch">
                        <Card className="border-rounded bg-white p-4 w-full">
                            <CardHeader className="flex justify-center items-center flex-col">
                                <p className="hero-title text-3xl text-primary">{subscription.title}</p>
                                <p className="hero-text m-0">{subscription.description}</p>
                            </CardHeader>
                            <CardContent className="">
                                <div className="flex items-baseline-last justify-center">
                                    <p className="hero-text text-mint text-3xl m-0">${subscription.price}</p>
                                    <p className="hero-text">/{subscription.duration}</p>
                                </div>
                                {subscription.features.map((feature) => (
                                    <div key={feature} className="hero-text flex items-center gap-2">
                                        <Check className="text-mint"/> {feature}
                                    </div>
                                ))}
                                <div className="flex-center m-4">
                                    <button className='btn-primary pastel-mint text-teal-600' disabled={isPending} onClick={() => onChoose({
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