import { auth } from "@/auth";

export async function addSubscription() {
    const session = await auth();
    const userId = session?.user?.id ? (session.user.id as string) : undefined;
}