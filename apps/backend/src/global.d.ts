import type { User as PrismaUser } from '@prisma/client';

type AuthenticatedUser = Omit<PrismaUser, 'password'>;

declare global {
  namespace Express {
    interface User extends AuthenticatedUser {}
  }
}
