import { Resolver, Query } from '@nestjs/graphql';

import { Permission } from '../schemas/permission.object';
import { PermissionService } from '../services/permission.service';

@Resolver(() => Permission)
export class PermissionResolver {
  constructor(private readonly permissionService: PermissionService) {}

  // ================================ Queries ================================

  @Query(() => [Permission], { description: 'Get all permissions' })
  async permissions(): Promise<Permission[]> {
    return await this.permissionService.findMany();
  }

  // ================================ Mutations ================================
  // ================================ Resolvers ================================
}
