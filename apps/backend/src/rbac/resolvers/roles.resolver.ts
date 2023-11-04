import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Parent, ResolveField } from '@nestjs/graphql';

import { UserAuthenticated } from '@/auth';
import { User } from '@/user/schemas/user.schema';

import { AssignedPermission } from '../schemas/permission.schema';
import { Role } from '../schemas/roles.schema';
import { RolesService } from '../services/roles.service';

@Resolver(() => Role)
@UseGuards(UserAuthenticated)
export class RolesResolver {
  constructor(private rolesService: RolesService) {}

  @Query(() => [Role], { description: 'Get all roles' })
  async roles() {
    const roles = await this.rolesService.getRoles();

    return roles;
  }

  @ResolveField(() => [User], { description: 'Members of a given role' })
  async members(@Parent() role: Role): Promise<User[]> {
    const { uid } = role;
    const users = await this.rolesService.getUsersWithRole(uid);
    return users;
  }

  @ResolveField(() => [AssignedPermission], { description: 'Role permissions' })
  async permissions(@Parent() role: Role): Promise<AssignedPermission[]> {
    const { uid } = role;
    const permissions = await this.rolesService.getAssignedPermissionsToRole(uid);
    return permissions;
  }
}
