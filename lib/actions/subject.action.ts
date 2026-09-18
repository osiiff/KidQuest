"use server";

import "dotenv/config";
import { prisma } from "../prisma";
import { Prisma } from "../generated/prisma/client";
import { formatError } from "../format-error";
import { revalidatePath } from "next/cache";

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

type SalesDataType = {
    month: string,
    totalSales: number
}[]


export async function getDashboardSummary() {
  
  const usersCount = await prisma.user.count();

  const activeSubscriptionsCount = await prisma.subscription.count({
    where: {
        status: 'ACTIVE'
    }
  });

  const subscriptionsCount = await prisma.subscription.count({
    where: {
        status: {
            not: 'PENDING'
        }
    }
  })

  const totalRevenue = await prisma.subscription.aggregate({
    where: {
        status: {
            not: 'PENDING'
        }
    },
    _sum: {
        price: true
        
    },
  });

  const salesDataRaw = await prisma.$queryRaw<
    Array<{
      month: string;
      totalSales: Prisma.Decimal;
    }>
  >`
    SELECT
      to_char("createdAt", 'MM/YY') AS "month",
      SUM("price") AS "totalSales"
    FROM "Subscription"
    WHERE "status" <> 'PENDING'
    GROUP BY to_char("createdAt", 'MM/YY')
    ORDER BY MIN("createdAt")
  `;

  const salesData: SalesDataType = salesDataRaw.map((entry) => ({
    month: entry.month,
    totalSales: Number(entry.totalSales),
  }));


  const latestSubscriptions = await prisma.subscription.findMany({
    where: {
        status: {
            not: 'PENDING'
        }
    },
    orderBy: {
        createdAt: 'desc'
    },
    include: {
        user: {
            select: {
                name: true,
                email: true
            }
        }
    },
    take: 6,
  })


  return {
    usersCount,
    activeSubscriptionsCount,
    subscriptionsCount,
    totalRevenue: Number(totalRevenue._sum.price ?? 0),
    latestSubscriptions ,
    salesData
  }
}

export async function getAllSubjects({
    query,
    subject,
    task,
    question,
}: {
    query: string,
    subject?: string,
    task?: string,
    question?: string
}) {
    const data = await prisma.subject.findMany({
        include: {
            tasks: {
                include: {
                    questions: true
                }
            }
        }
    });

    return data;
}

export async function deleteTask(id: string) {
    try {
        const taskExists = await prisma.task.findFirst({
        where: {
            id
        }
    });

    if(!taskExists) throw new Error('Task not found');

    await prisma.task.delete({
        where: {
            id
        }
    });

    revalidatePath('/admin/tasks');

    return {
        success: true,
        message: 'Task deleted successfully'
    }

    } catch (error) {
     return {
        success: false,
        message: formatError(error)
     }   
    }
}