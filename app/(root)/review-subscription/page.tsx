import CheckoutSteps from "@/components/shared/checkout-steps";
import { auth } from "@/auth";
import { getUserById } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Check, X } from "lucide-react";
import { SUBSCRIPTION_PLANS } from "@/lib/constants";
import Link from "next/link";
import { getMyPendingSubscription } from "@/lib/actions/subscription.actions";
import { ReviewSubscriptionButton } from "./review-subscription-button";

export const metadata: Metadata = {
  title: "Review",
};

const ReviewSubscriptionPage = async () => {
  const chosenSubscription = await getMyPendingSubscription();
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

  const paypalClientId = process.env.PAYPAL_CLIENT_ID;
  if (!paypalClientId) {
      throw new Error("PAYPAL_CLIENT_ID is not configured");
  }

  return (
    <div className="w-full min-w-0">
      <div className="min-w-0 [&>div]:flex-wrap [&>div]:gap-y-3 [&_.nav-link]:max-w-full [&_.nav-link]:text-center">
        <CheckoutSteps current={2} />
      </div>
      <div className="badge">
        <p>Subscription</p>
      </div>
      <div>
        <p className="mt-6 min-w-0 text-2xl leading-tight font-extrabold tracking-[-0.055em] text-[#29276f] wrap-anywhere sm:text-3xl lg:text-4xl">Review your subscription</p>
      </div>
      <div className="my-6 grid w-full min-w-0 grid-cols-1 items-start gap-5 sm:gap-6 lg:grid-cols-2">
        <Card className="pastel-purple w-full min-w-0 self-start rounded-(--radius-2xl,40px) border-2 p-3 sm:p-5">
          <CardHeader className="flex min-w-0 flex-col items-center justify-center gap-2 px-0 text-center">
            <p className="w-full min-w-0 text-2xl leading-tight font-extrabold tracking-[-0.055em] text-primary wrap-anywhere sm:text-3xl">
              {selectedPlan.title}
            </p>
            <p className="min-w-0 text-base leading-relaxed font-medium text-(--muted) wrap-anywhere">{selectedPlan.description}</p>
          </CardHeader>
          <CardContent className="flex min-w-0 flex-col gap-5 px-0 pt-5">
            <div className="flex min-w-0 flex-wrap items-baseline justify-center gap-x-1 gap-y-1 text-center">
              <p className="text-3xl leading-tight font-medium text-mint">
                ${selectedPlan.price}
              </p>
              <p className="min-w-0 text-base leading-relaxed font-medium text-(--muted) wrap-anywhere">/{selectedPlan.duration}</p>
            </div>
            <div className="flex min-w-0 flex-col gap-3">
              {selectedPlan.features.map((feature) => (
                <div key={feature} className="flex min-w-0 items-start gap-2 text-base leading-relaxed font-medium text-(--muted)">
                  <Check className="mt-1 size-5 shrink-0 text-mint" />
                  <span className="min-w-0 wrap-anywhere">{feature}</span>
                </div>
              ))}
            </div>
            <Link href='/subscription' className="btn-secondary flex min-h-12 w-full justify-center px-3 py-3 text-base leading-snug">
                Edit
            </Link>
          </CardContent>
        </Card>
        <Card className="w-full min-w-0 rounded-(--radius-2xl,40px) border-2 bg-white p-3 sm:p-5">
            <CardHeader className="min-w-0 px-0 pb-4">
                <p className="min-w-0 text-2xl leading-tight font-extrabold tracking-[-0.055em] text-[#29276f] wrap-anywhere sm:text-3xl">Your Selection</p>
            </CardHeader>
            <CardContent className="flex min-w-0 flex-col gap-4 px-0 text-base leading-relaxed font-medium text-(--muted) wrap-anywhere sm:gap-5">
                <div className="grid min-w-0 grid-cols-1 gap-1 sm:grid-cols-2 sm:gap-3">
                    <p className="min-w-0">Plan</p>
                    <p className="min-w-0 text-black sm:text-right">{selectedPlan.title}</p>
                </div>
                <div className="grid min-w-0 grid-cols-1 gap-1 sm:grid-cols-2 sm:gap-3">
                    <p className="min-w-0">Price</p>
                    <p className="min-w-0 text-primary sm:text-right">${selectedPlan.price}</p>
                </div>
                <div className="min-w-0">
                    Billed every {' '} {selectedPlan.duration}
                </div>
                <hr className="w-full border-b-2"></hr>
                <div className="flex min-w-0 flex-col gap-3">
                    <p className="min-w-0 text-xl leading-snug font-extrabold tracking-[-0.055em] text-[#29276f] sm:text-2xl">Payment Method</p>
                    <div className="flex min-w-0 flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <p className="min-w-0">{user.paymentMethod}</p>
                        <Link href='/payment-method' className="btn-secondary min-h-12 w-full shrink-0 px-3 py-3 text-base leading-snug sm:w-auto sm:px-5">
                            Edit
                        </Link>
                    </div>
                </div>
                <div className="w-full min-w-0">
                    <div className="flex min-w-0 items-center justify-between gap-3">
                        <p className="min-w-0 text-xl leading-snug font-extrabold tracking-[-0.055em] text-[#29276f] sm:text-2xl">Auto-revew</p>
                        {selectedPlan.autoRenew === true ? <Check className="size-6 shrink-0 text-mint"/> : <X className="size-6 shrink-0 text-red-700"/>}
                    </div>
                </div>
                <ReviewSubscriptionButton paypalClientId={paypalClientId}/>
            </CardContent>
        </Card>
      </div>
      
    </div>
  );
};

export default ReviewSubscriptionPage;
