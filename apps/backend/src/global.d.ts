import type { AuthenticatedUser } from '@/user';

declare global {
  namespace Express {
    interface User extends AuthenticatedUser {}
  }
}
