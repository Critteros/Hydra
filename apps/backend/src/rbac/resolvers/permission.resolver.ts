import { Resolver, Query } from '@nestjs/graphql';

import { Permission } from '../schemas/permission.schema';
import { PermissionService } from '../services/permission.service';

@Resolver()
export class PermissionResolver {
  constructor(private readonly permissionService: PermissionService) {}

  @Query(() => [Permission], { description: 'Get all permissions' })
  async permissions(): Promise<Permission[]> {
    return await this.permissionService.getPermissions();
  }
}
