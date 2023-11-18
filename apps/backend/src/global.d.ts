import type { Permissions } from '@hydra-ipxe/common/shared/permissions';

import type { AuthenticatedUser } from '@/user/types';

declare global {
  namespace Express {
    interface User extends AuthenticatedUser {}
    interface Request {
      permissions?: Permissions[];
    }
  }
}

declare module 'graphql' {
  interface GraphQLErrorExtensions {
    status?: string;
    originalError?: {
      statusCode: number;
      message: string;
    };
  }
}
