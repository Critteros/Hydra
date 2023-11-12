import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';

import { extractRequest } from '@/utils/context';

@Injectable()
export class AdminUserGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = extractRequest(context);

    const isAllowed = request.user?.accountType === 'ADMIN';
    if (!isAllowed) {
      throw new ForbiddenException('This resource is only available to Administrators');
    }

    return isAllowed;
  }
}
