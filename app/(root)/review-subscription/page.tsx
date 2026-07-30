import CheckoutSteps from "@/components/shared/checkout-steps";
import { auth } from "@/auth";
import { getMySubscription, getUserById } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Check, X } from "lucide-react";
import { SUBSCRIPTION_PLANS } from "@/lib/constants";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Review",
};

const ReviewSubscriptionPage = async () => {
  const chosenSubscription = await getMySubscription();
  const session = await auth();

  const userId = session?.user?.id;
  if (!userId) throw new Error("User not found");

  const user = await getUserById(userId);

  if (!chosenSubscription?.plan) redirect("/subscription");
  if (!user) redirect("/sign-in");

  const selectedPlan = SUBSCRIPTION_PLANS.find(
    (subscription) => subscription.value === chosenSubscription.plan,
  );

  if (!selectedPlan) {
    redirect("/subscription");
  }

  return (
    <div>
      <CheckoutSteps current={2} />
      <div className="badge">
        <p>Subscription</p>
      </div>
      <div>
        <p className="hero-title text-4xl">Review your subscription</p>
      </div>
      <div  className="flex justify-around w-full">
        <Card className="border-2 border-rounded pastel-purple p-4 w-xl m-5 ">
          <CardHeader className="flex justify-center items-center flex-col">
            <p className="hero-title text-3xl text-primary">
              {selectedPlan.title}
            </p>
            <p className="hero-text m-0">{selectedPlan.description}</p>
          </CardHeader>
          <CardContent className="">
            <div className="flex items-baseline-last justify-center">
              <p className="hero-text text-mint text-3xl m-0">
                ${selectedPlan.price}
              </p>
              <p className="hero-text">/{selectedPlan.duration}</p>
            </div>
            {selectedPlan.features.map((feature) => (
              <div key={feature} className="hero-text flex items-center gap-2 mb-4">
                <Check className="text-mint" /> {feature}
              </div>
            ))}
            <Link href='/subscription' className="btn-secondary flex justify-center">
                Edit
            </Link>
          </CardContent>
        </Card>
        <Card className="border-2 border-rounded bg-white p-4 m-5 w-xl">
            <CardHeader>
                <p className="hero-title text-2xl">Your Selection</p>
            </CardHeader>
            <CardContent>
                <div className="flex-between">
                    <p className="hero-text">Plan</p>
                    <p className="hero-text text-black">{selectedPlan.title}</p>
                </div>
                <div className="flex-between">
                    <p className="hero-text">Price</p>
                    <p className="hero-text text-primary">${selectedPlan.price}</p>
                </div>
                <div className="hero-text">
                    Billed every {' '} {selectedPlan.duration}
                </div>
                <hr className="hero-text border-b-2"></hr>
                <div>
                    <p className="hero-title text-xl">Payment Method</p>
                    <div className="flex-between items-baseline">
                        <p className="hero-text">{user.paymentMethod}</p>
                        <Link href='/payment-method' className="btn-secondary">
                            Edit
                        </Link>
                    </div>
                </div>
                <div className="w-full">
                    <div className="flex-between items-baseline">
                        <p className="hero-title text-xl pb-0">Auto-revew</p> 
                        {selectedPlan.autoRenew === true ? <Check className="text-mint"/> : <X className="text-red-700"/>}
                    </div>
                </div>
                <button className="btn-primary my-3 w-full">
                    Continue 
                </button>
            </CardContent>
        </Card>
      </div>
      
    </div>
  );
};

export default ReviewSubscriptionPage;
