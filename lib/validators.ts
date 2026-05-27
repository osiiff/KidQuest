import { z } from 'zod';

export const insertTasksSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters'),
    slug: z.string().min(3, 'Slug must be at least 3 characters'),
    description: z.string().min(3, 'Description must be at least 3 characters'),
    image: z.string().min(1, 'Subject must have at least one image'),
    question: z.string().min(1, 'Question is required'),
    options: z.array(z.string()).min(2, 'Task must have at least 2 options'),
    correctAnswer: z.string().min(1, 'Task must have correct answer'),
    difficulty: z.string().default('beginner'),
    ageGroup: z.string().default('all'),
})

export const insertSubjectsSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters'),
    slug: z.string().min(3, 'Slug must be at least 3 characters'),
    description: z.string().min(3, 'Description must be at least 3 characters'),
    image: z.string().min(1, 'Subject must have at least one image'),
    tasks: z.array(insertTasksSchema).min(1),
})

