import { Prisma } from "@/lib/generated/prisma/client";
import { insertSubjectsSchema, insertTasksSchema } from "@/lib/validators";
import z from "zod";


export type Subject = z.infer<typeof insertSubjectsSchema> & {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}

export type Task = z.infer<typeof insertTasksSchema> & {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}

export type SubjectWithTasks = Prisma.SubjectGetPayload<{
    include: {
        tasks: true;
    }
}>