import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

import { extractRequest } from '@/utils/context';

@Injectable()
export class AdminUserGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = extractRequest(context);

    return request.user?.accountType === 'ADMIN';
  }
}
