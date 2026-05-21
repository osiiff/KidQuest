"use server";

import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

export async function getLatestSubjects() {
    const subjects = await prisma.subject.findMany({
        include: {
            tasks: true,
        },
    })

    return subjects;
}