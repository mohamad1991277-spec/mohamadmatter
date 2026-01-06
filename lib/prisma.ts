import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

// Flexible initialization to avoid build-time crashes if DATABASE_URL is missing
const createPrismaClient = () => {
    try {
        return new PrismaClient();
    } catch (e) {
        console.warn("Prisma client could not be initialized. This is expected during some build phases if DATABASE_URL is not set.");
        return null as any;
    }
}

export const prisma = globalForPrisma.prisma || createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
