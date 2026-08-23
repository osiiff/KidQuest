"use client";

import { createSubscriptionPayment } from "@/lib/actions/subscription.actions";

export function ReviewSubscriptionButton() {
    const handlePayPalPayment = async () => {
        const result = await createSubscriptionPayment();

        console.log(result);
    };

    return (
        <button onClick={handlePayPalPayment} className="btn-primary my-3 w-full">
            Continue To Payment
        </button>
    );
}