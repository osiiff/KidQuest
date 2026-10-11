import { z } from 'zod';
import { PAYMENT_METHODS } from './constants';
import { SubscriptionPlan } from './generated/prisma/enums';

export const insertQuestionSchema = z.object({
    text: z.string().min(3, 'Text must be at least 3 characters'),
    options: z.array(z.string().min(1, 'Option must be at least 1 character')).min(2, 'Options must be at least 2'),
    correctAnswer: z.string().min(1, 'Answer must be at least 1 character'),
    taskId: z.string().min(1, 'Id is required'),
}).refine((question) => question.options.includes(question.correctAnswer), {
    message: 'Correct answer must be in the options',
    path: ['correctAnswer']
})

export const updateQuestionSchema = insertQuestionSchema.extend({
    id: z.string().min(1, 'Id is required')
})

export const insertTasksSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters'),
    slug: z.string().min(3, 'Slug must be at least 3 characters'),
    description: z.string().min(3, 'Description must be at least 3 characters'),
    image: z.string().min(1, 'Subject must have at least one image'),
    difficulty: z.string().default('beginner'),
    ageGroup: z.string().default('all'),
    subjectId: z.string().min(1, 'Id is required'),
});

export const updateTasksSchema = insertTasksSchema.extend({
    id: z.string().min(1, 'Id is required')
})

export const insertSubjectsSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters'),
    slug: z.string().min(3, 'Slug must be at least 3 characters'),
    description: z.string().min(3, 'Description must be at least 3 characters'),
    image: z.string().min(1, 'Subject must have at least one image'),
})

export const updateSubjectsSchema = insertSubjectsSchema.extend({
    id: z.string().min(1, 'Id is required')
})

export const signInFormSchema = z.object({
    email: z.string().email('Invalid email adress'),
    password: z.string().min(6, 'Password must be at least 6 characters')
})

export const signUpFormSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters'),
    email: z.string().email('Invalid email adress'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Confirm password must be at least 6 characters')
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword']
})

export const paymentMethodSchema = z.object({
    type: z.string().min(1, 'Payment method is required')
}).refine((data) => PAYMENT_METHODS.includes(data.type), {
    path: ['type'],
    message: 'Invalid payment method',
})

export const subscriptionSchema = z.object({
    plan: z.enum(SubscriptionPlan) ,
    paymentMethod: z.string().refine((data) => PAYMENT_METHODS.includes(data), {
        message: 'Invalid payment method',
    }),
    autoRenew: z.boolean(),
})

export const subscriptionPlanSchema = z.object({
  plan: z.enum(["MONTHLY", "THREE_MONTHS", "YEARLY"]),
});

export const updateProfileSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters'),
    email: z.string().min(3, 'Email must be at least 3 characters')
})

