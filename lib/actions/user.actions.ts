"use server";

import { paymentMethodSchema, signInFormSchema, updateProfileSchema, updateUserSchema} from "../validators";
import { signUpFormSchema } from "../validators";
import { auth, signIn, signOut, updateSession } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { hashSync } from "bcrypt-ts-edge";
import { prisma } from "../prisma";
import { formatError } from "../format-error";
import z from "zod";
import { revalidatePath } from "next/cache";
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

export async function updateProfile(user: {name: string, email: string}) {
    try {
        const session = await auth();
        if (!session?.user?.id) throw new Error('User not found');

        const profile = updateProfileSchema.parse(user);

        const currentUser = await prisma.user.findFirst({
            where: {
                id: session?.user?.id
            }
        });

        if(!currentUser) throw new Error('User not found')

        const updatedUser = await prisma.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                name: profile.name,
            },
            select: { name: true },
        });

        // Update the JWT cookie before re-rendering cached server layouts.
        await updateSession({ user: { name: updatedUser.name } });
        revalidatePath('/', 'layout');

        return {
            success: true,
            message: 'User updated successfully'
        }
    } catch (error) {
        return {
            success: false,
            message: formatError(error)
        }
    }
}

export async function getAllUsers({
    query
}: {
    query: string
}) {
    const queryFilter = query && query !== 'all' ? {
          name: {
            contains: query,
            mode: 'insensitive'
          } as Prisma.StringFilter
      } : {};
      
    const data = await prisma.user.findMany({
        where: {
            ...queryFilter
        },
        orderBy: {
            createdAt: 'desc'
        },
    });

    const dataCount = await prisma.user.count();

    return {
        data,
        dataCount
    }
}

export async function deleteUser(id: string) {
    try {
        await prisma.user.delete({
            where: {
                id
            }
        });
        revalidatePath('/admin/users');
        return {
            success: true,
            message: 'User deleted successfully'
        }
    } catch (error) {
        return {
            success: false,
            message: formatError(error)
        }
    }
}

export async function updateUser(user: z.infer<typeof updateUserSchema>) {
    try {
        await prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                name: user.name,
                role: user.role
            }
        })
        revalidatePath('/admin/users')

        return {
            success: true,
            message: 'User updated successfully'
        }
    } catch (error) {
        return {
            success: false,
            message: formatError(error)
        }
    }
}
