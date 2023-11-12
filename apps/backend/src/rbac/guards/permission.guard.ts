import {
  Injectable,
  type CanActivate,
  type ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { Permissions } from '@hydra-ipxe/common/shared/permissions';
import { AccountType } from '@prisma/client';

import { extractRequest } from '@/utils/context';

import { RequirePermission } from '../decorators/require-permissions.decorator';
import { PermissionService } from '../services/permission.service';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly permissionsService: PermissionService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.get(RequirePermission, context.getHandler()) as
      | Permissions[]
      | undefined;
    if (!requiredPermissions) return true;

    const { user, permissions: userPermissions } = extractRequest(context);

    if (!user) throw new Error('Missing user in context');
    if (!userPermissions) throw new Error('Missing permissions in context');

    const { accountType } = user;

    if (accountType === AccountType.ADMIN) return true;

    const isAllowed = requiredPermissions.reduce(
      (acc, permission) => acc && userPermissions.includes(permission),
      true,
    );

    if (!isAllowed) {
      throw new ForbiddenException("You don't have permission to access this resource");
    }
    return isAllowed;
  }
}
