import { PrismaClient } from '@prisma/client';

// Prevent multiple instances in dev (Next.js hot reload)
declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient({
  log: process.env.NODE_ENV === 'development'
    ? (process.env.PRISMA_DEBUG_LOGS === 'true' ? ['query', 'error', 'warn'] : ['warn'])
    : ['error'],
});

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}
