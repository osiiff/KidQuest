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

export async function getTaskBySlug(slug: string) {
    const task = prisma.task.findFirst({
        where: {
            slug,
        },
        include: {
            subject: true,
            questions: {
                orderBy: {
                    id: 'asc'
                }
            }
        },
    });

    if (!task) return null

    return task
    
} 