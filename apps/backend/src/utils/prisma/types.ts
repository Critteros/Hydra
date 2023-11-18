import { PrismaClient } from '@prisma/client';

type TransactionFn = Parameters<PrismaClient['$transaction']>[0];
export type PrismaCtx = Parameters<TransactionFn>[0];
