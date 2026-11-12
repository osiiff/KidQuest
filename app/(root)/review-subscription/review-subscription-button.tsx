"use client";

import { approveSubscriptionPayment, createSubscriptionPayment } from "@/lib/actions/subscription.actions";
import {PayPalButtons, PayPalScriptProvider, usePayPalScriptReducer} from '@paypal/react-paypal-js'
import { toast } from "sonner";

function PrintLoadingState() {
    const [{isPending, isRejected}] = usePayPalScriptReducer();

    if(isPending ) {
        return (
            <p>Loading PayPal...</p>
        )
    } 
    if(isRejected) {
        return (
            <p>Error loading PayPal</p>
        )
    }
    return null;
}

export function ReviewSubscriptionButton({paypalClientId}: {paypalClientId: string}) {
    const handleCreatePayPalOrder = async () => {
        const result = await createSubscriptionPayment();

        if(!result?.success || !result.paypalOrderId) {
            toast.error(result?.message)
            throw new Error(result?.message)
        } 

        return result.paypalOrderId

    };

    const handleApprovePayPalOrder = async (data: {orderID: string}) => {
        const result = await approveSubscriptionPayment({orderId: data.orderID});

        if (result?.success) {
            toast.success(result.message);
        } else {
            toast.error(
                result?.message ?? "Could not activate subscription"
            );
        }
    }

    return (
        <PayPalScriptProvider options={{clientId: paypalClientId, currency: 'USD'}}>
            <div className="w-full min-w-0 wrap-anywhere">
                <PrintLoadingState/>
                <PayPalButtons className="w-full min-w-0" style={{layout: 'vertical', height: 45}} createOrder={handleCreatePayPalOrder} onApprove={handleApprovePayPalOrder}/>
            </div>
        </PayPalScriptProvider>
    );
}
