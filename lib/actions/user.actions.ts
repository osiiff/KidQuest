"use server";

import { paymentMethodSchema, signInFormSchema, subscriptionPlanSchema } from "../validators";
import { signUpFormSchema } from "../validators";
import { auth, signIn, signOut } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { hashSync } from "bcrypt-ts-edge";
import { prisma } from "../prisma";
import { formatError } from "../format-error";
import z from "zod";
import { Prisma } from "../generated/prisma/client";

export async function signWithCredentials(prevState: unknown, formData: FormData) {
    try {
        const user = signInFormSchema.parse({
            email: formData.get('email'),
            password: formData.get('password')
        });

        await signIn('credentials', {
            ...user,
            redirectTo: '/subscription',
        })

        return { success: true, message: 'Signed in successfully!' }
    } catch (error) {
        if (isRedirectError(error)) {
            throw error;
        }

        return { success: false, message: 'Invalid email or password' }
    }
} 

export async function signOutUser() {
    await signOut();
}

export async function signUpUser(prevState: unknown, formData: FormData) {
    try {
        const user = signUpFormSchema.parse({
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword'),
        });

        const plainPassword = user.password;

        user.password = hashSync(user.password, 10);

        await prisma.user.create({
            data: {
                name: user.name,
                email: user.email,
                password: user.password,
            }
        });

        await signIn('credentials', {
            email: user.email,
            password: plainPassword,
        })

        return { success: true, message: 'User registered successfully!' }
    } catch (error) {

        if (isRedirectError(error)) {
            throw error;
        }

        return { success: false, message: formatError(error) }
    }
} 

export async function getUserById(userId: string) {
    const user = await prisma.user.findFirst({
        where: {id: userId}
    });

    if(!user) throw new Error('User not found')
    return user;
}

export async function updateUserPaymentMethod(data: z.infer<typeof paymentMethodSchema>) {
    try {

        const session = await auth();

        const currentUser = await prisma.user.findFirst({
            where: {id: session?.user?.id}
        });

        if(!currentUser) throw new Error('User not found');

        const paymentMethod = paymentMethodSchema.parse(data);

        await prisma.user.update({
            where: {id: currentUser.id},
            data: {
                paymentMethod: paymentMethod.type
            },
        });

        return {
            success: true,
            message: 'User updated successfully',
        }

    } catch (error) {
        return {
            success: false,
            message: formatError(error)
        }
    }
}

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

        await prisma.subscription.create({
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
        }

    } catch (error) {
        return {
            success: false,
            message: formatError(error)
        }
    }
}

export async function getMySubscription() {
    
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