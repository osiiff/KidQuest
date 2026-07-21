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

export async function getSubjectBySlug(slug: string) {
    const subject = await prisma.subject.findUnique({
        where: {
            slug,
        },
        include: {
            tasks: true,
        }
    });

    return subject;
}

export async function getTaskByGroup(ageGroup: string) {
  const tasks = await prisma.task.findMany({
    where: 
        ageGroup === 'all' ? undefined : {
            ageGroup,
        },

    include: {
        subject: true,
        questions: {
            orderBy: {
                id: 'asc'
            }
        }
    }
  });


  return tasks;
}