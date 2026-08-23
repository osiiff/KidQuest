"use server";

import { auth } from "@/auth";
import { prisma } from "../prisma";
import z from "zod";
import { subscriptionPlanSchema } from "../validators";
import { Prisma } from "../generated/prisma/client";
import { formatError } from "../format-error";
import { paypal } from "../paypal";

export async function createUserSubscription(data: z.infer<typeof subscriptionPlanSchema>) {
    try {
        const session = await auth();

        const currentUser = await prisma.user.findFirst({
            where: {id: session?.user?.id}
        });

        if (!currentUser) throw new Error('User not found');

        const subscription = subscriptionPlanSchema.parse(data);

        const subscriptionPrices = {
            MONTHLY: new Prisma.Decimal("9.99"),
            THREE_MONTHS: new Prisma.Decimal("24.99"),
            YEARLY: new Prisma.Decimal("79.99"),
        };

        const createdSubscription = await prisma.subscription.create({
            data: {
                userId: currentUser.id,
                plan: subscription.plan,
                status: 'PENDING',
                price: subscriptionPrices[subscription.plan],
            }
        })
        return {
            success: true,
            message: 'Subscription selected successfully',
            subscriptionId: createdSubscription.id
        }

    } catch (error) {
        return {
            success: false,
            message: formatError(error)
        }
    }
}

export async function getMyPendingSubscription() {
    
    const session = await auth();
    const userId = session?.user?.id;

    if(!userId) return undefined;

    const subscription = await prisma.subscription.findFirst({
        where: {
            userId,
            status: "PENDING",
        },
            orderBy: {
                createdAt: "desc",
        },
    })

    return subscription ?? undefined;
}

export async function createSubscriptionPayment() {
    try {
        const session = await auth();
        const userId = session?.user?.id;

        if(!userId) return undefined;

        const latestSubscription = await getMyPendingSubscription();
        if(!latestSubscription) throw new Error('Subscription is not found');

        const paypalOrder = await paypal.createOrder(latestSubscription.price.toNumber())

        console.log(paypalOrder)

        return {
            success: true,
            subscriptionId: latestSubscription.id,
            paypalOrderId: paypalOrder.id,
        }
    } catch (error) {
        return {
            success: false,
            message: formatError(error)
        }
    }
}