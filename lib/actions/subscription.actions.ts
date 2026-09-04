"use server";

import { auth } from "@/auth";
import { prisma } from "../prisma";
import z from "zod";
import { subscriptionPlanSchema } from "../validators";
import { Prisma } from "../generated/prisma/client";
import { formatError } from "../format-error";
import { paypal } from "../paypal";

export async function createUserSubscription(
  data: z.infer<typeof subscriptionPlanSchema>,
) {
  try {
    const session = await auth();

    const currentUser = await prisma.user.findFirst({
      where: { id: session?.user?.id },
    });

    if (!currentUser) throw new Error("User not found");

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
        status: "PENDING",
        price: subscriptionPrices[subscription.plan],
      },
    });
    return {
      success: true,
      message: "Subscription selected successfully",
      subscriptionId: createdSubscription.id,
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

export async function getMyPendingSubscription() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) return undefined;

  const subscription = await prisma.subscription.findFirst({
    where: {
      userId,
      status: "PENDING",
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return subscription ?? undefined;
}

export async function createSubscriptionPayment() {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) return undefined;

    const latestSubscription = await getMyPendingSubscription();
    if (!latestSubscription) throw new Error("Subscription is not found");

    const paypalOrder = await paypal.createOrder(
      latestSubscription.price.toNumber(),
    );

    await prisma.subscription.update({
      where: {
        id: latestSubscription.id,
      },
      data: {
        providerPaymentId: paypalOrder.id,
      },
    });

    return {
      success: true,
      subscriptionId: latestSubscription.id,
      paypalOrderId: paypalOrder.id,
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

export async function approveSubscriptionPayment(data: { orderId: string }) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) return undefined;

    const latestSubscription = await prisma.subscription.findFirst({
      where: {
        userId,
        providerPaymentId: data.orderId,
        status: "PENDING",
      },
    });
    if (!latestSubscription) throw new Error("Subscription is not found");

    const captureData = await paypal.capturePayment(data.orderId);

    if (
      !captureData ||
      captureData.id !== latestSubscription.providerPaymentId ||
      captureData.status !== "COMPLETED"
    ) {
      throw new Error("Error in PayPal payment");
    }

    const startDate = new Date();
    const endDate = new Date(startDate);

    if (latestSubscription.plan === "MONTHLY") {
      endDate.setMonth(endDate.getMonth() + 1);
    } else if (latestSubscription.plan === "THREE_MONTHS") {
      endDate.setMonth(endDate.getMonth() + 3);
    } else if (latestSubscription.plan === "YEARLY") {
      endDate.setFullYear(endDate.getFullYear() + 1);
    }

    await prisma.subscription.update({
      where: {
        id: latestSubscription.id,
      },
      data: {
        status: "ACTIVE",
        startDate: startDate,
        endDate: endDate,
      },
    });

    return {
      success: true,
      message: "Subscription activated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}
