import { UseGuards } from '@nestjs/common';
import { Resolver, Query } from '@nestjs/graphql';

import { UserAuthenticated } from '@/auth/guards/user-authenticated.guard';

import { Permission } from '../schemas/permission.object';
import { PermissionService } from '../services/permission.service';

@Resolver(() => Permission)
@UseGuards(UserAuthenticated)
export class PermissionResolver {
  constructor(private readonly permissionService: PermissionService) {}

  // ================================ Queries ================================

  @Query(() => [Permission], { description: 'Get all permissions' })
  async permissions(): Promise<Permission[]> {
    return await this.permissionService.getPermissions();
  }

  // ================================ Mutations ================================
  // ================================ Resolvers ================================
}
