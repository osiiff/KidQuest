"use server";

import "dotenv/config";
import { prisma } from "../prisma";

export async function getLatestSubjects() {
    const subjects = await prisma.subject.findMany({
        include: {
            tasks: true,
        },
    })

    return subjects;
}