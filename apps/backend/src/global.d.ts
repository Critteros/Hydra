import type { User as PrismaUser } from '@prisma/client';

declare global {
  namespace Express {
    interface User extends AuthenticatedUser {}
  }
  type AuthenticatedUser = Omit<PrismaUser, 'password'>;
}
