import {
  Injectable,
  type CanActivate,
  type ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';

import { AccountType } from '@prisma/client';

import { MetadataService } from '@/metadata/metadata.service';
import { extractRequest } from '@/utils/context';

import { RequirePermission } from '../decorators/require-permissions.decorator';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private readonly metadataService: MetadataService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.metadataService.getDecoratorMetadata({
      context,
      decorator: RequirePermission,
    });
    if (!requiredPermissions) return true;

    const { user, permissions: userPermissions } = extractRequest(context);

    if (!user) throw new UnauthorizedException('User is not authenticated');
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
