import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SUBSCRIPTION_PLANS } from "@/lib/constants";
import { Check } from "lucide-react";
import Link from "next/link";


const SubscriptionCard = () => {
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
                                    <Link href='/payment-method' className="btn-primary pastel-mint text-teal-600">{subscription.buttonText}</Link>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </div>
    )
}

export default SubscriptionCard;