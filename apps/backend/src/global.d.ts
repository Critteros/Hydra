import type { AuthenticatedUser } from '@/user/types';

declare global {
  namespace Express {
    interface User extends AuthenticatedUser {}
  }
}
