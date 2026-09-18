"use server";

import "dotenv/config";
import { prisma } from "../prisma";
import { Prisma } from "../generated/prisma/client";
import { formatError } from "../format-error";
import { revalidatePath } from "next/cache";
import z from "zod";
import { insertQuestionSchema, insertSubjectsSchema, insertTasksSchema, updateQuestionSchema, updateSubjectsSchema, updateTasksSchema } from "../validators";

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

export async function createSubject(data: z.infer<typeof insertSubjectsSchema>) {
    try {
        const subject = insertSubjectsSchema.parse(data);

        await prisma.subject.create({
            data: subject,
        });

        revalidatePath('/admin/tasks');

        return {
            success: true,
            message: 'Subject created successfully'
        }

    } catch (error) {
        return {
        success: false,
        message: formatError(error)
     }  
    }
}

export async function createTask(data: z.infer<typeof insertTasksSchema>) {
    try {
        const task = insertTasksSchema.parse(data);

        await prisma.task.create({
            data: task,
        });

        revalidatePath('/admin/tasks');

        return {
            success: true,
            message: 'Task created successfully'
        }

    } catch (error) {
        return {
        success: false,
        message: formatError(error)
     }  
    }
}

export async function createQuestion(data: z.infer<typeof insertQuestionSchema>) {
    try {
        const question = insertQuestionSchema.parse(data);

        await prisma.question.create({
            data: question,
        });

        revalidatePath('/admin/tasks');

        return {
            success: true,
            message: 'Question created successfully'
        }

    } catch (error) {
        return {
        success: false,
        message: formatError(error)
     }  
    }
}

export async function updateSubject(data: z.infer<typeof updateSubjectsSchema>) {
    try {
        const subject = updateSubjectsSchema.parse(data);

        const subjectExists = await prisma.subject.findFirst({
            where: {
                id: subject.id
            }
        });

        if(!subjectExists) throw new Error('Subject not found');

        await prisma.subject.update({
            where: {
                id: subject.id
            },
            data: subject
        });

        revalidatePath('/admin/tasks');

        return {
            success: true,
            message: 'Subject updated successfully'
        }

    } catch (error) {
        return {
        success: false,
        message: formatError(error)
     }  
    }
}

export async function updateTask(data: z.infer<typeof updateTasksSchema>) {
    try {
        const task = updateTasksSchema.parse(data);

        const taskExists = await prisma.task.findFirst({
            where: {
                id: task.id
            }
        });

        if(!taskExists) throw new Error('Task not found');

        await prisma.task.update({
            where: {
                id: task.id
            },
            data: task
        });

        revalidatePath('/admin/tasks');

        return {
            success: true,
            message: 'Task updated successfully'
        }

    } catch (error) {
        return {
        success: false,
        message: formatError(error)
     }  
    }
}

export async function updateQuestion(data: z.infer<typeof updateQuestionSchema>) {
    try {
        const question = updateQuestionSchema.parse(data);

        const questionExists = await prisma.question.findFirst({
            where: {
                id: question.id
            }
        });

        if(!questionExists) throw new Error('Task not found');

        await prisma.question.update({
            where: {
                id: question.id
            },
            data: question
        });

        revalidatePath('/admin/tasks');

        return {
            success: true,
            message: 'Question updated successfully'
        }

    } catch (error) {
        return {
        success: false,
        message: formatError(error)
     }  
    }
}