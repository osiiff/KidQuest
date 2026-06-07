import { z } from 'zod';

export const insertTasksSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters'),
    slug: z.string().min(3, 'Slug must be at least 3 characters'),
    description: z.string().min(3, 'Description must be at least 3 characters'),
    image: z.string().min(1, 'Subject must have at least one image'),
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

export const signInFormSchema = z.object({
    email: z.string().email('Invalid email adress'),
    password: z.string().min(6, 'Password must be at least 6 characters')
})

