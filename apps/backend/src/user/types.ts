import type { User as PrismaUser } from '@prisma/client';

export type AuthenticatedUser = Omit<PrismaUser, 'password'>;
