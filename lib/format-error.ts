import { ZodError } from "zod";
import { Prisma } from "./generated/prisma/client";


export function formatError(error: unknown) {
  if(error instanceof ZodError) {
    const fieldError = error.issues.map((issue) => issue.message);

    return fieldError.join('. ')
  } else if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
    const target = error.meta?.target
    const field = Array.isArray(target) && typeof target[0] === "string" ? target[0] : "Field";
    return `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`
  } else {
    if (error instanceof Error) {
        return error.message;
    }
    return 'Something went wrong';
  }
}