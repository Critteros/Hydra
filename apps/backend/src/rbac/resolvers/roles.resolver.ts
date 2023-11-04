import { BadRequestException, UseGuards } from '@nestjs/common';
import { Resolver, Query, Parent, ResolveField, Mutation, Args, Int } from '@nestjs/graphql';

import { MapErrors } from '@hydra-ipxe/common/shared/errors';

import { UserAuthenticated } from '@/auth';
import { AdminUserGuard } from '@/user/guards';
import { User } from '@/user/schemas/user.schema';

import { AssignedPermission } from '../schemas/permission.schema';
import { Role, CreateRoleInput } from '../schemas/roles.schema';
import { RolesService, RoleNotFoudError, RoleAlreadyExistsError } from '../services/roles.service';

@Resolver(() => Role)
@UseGuards(UserAuthenticated)
@UseGuards(AdminUserGuard)
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

  @Mutation(() => Role, { description: 'Create a new role' })
  @MapErrors({
    if: RoleAlreadyExistsError,
    then: () => new BadRequestException('Role already exists'),
  })
  async createRole(
    @Args('input') { description, name }: CreateRoleInput,
  ): Promise<Omit<Role, 'permissions' | 'members'>> {
    const role = await this.rolesService.createRole({ description, name });
    return role;
  }

  @Mutation(() => Boolean, { description: 'Delete a role' })
  @MapErrors([
    {
      if: RoleNotFoudError,
      then: () => new BadRequestException('Role not found'),
    },
  ])
  async deleteRole(@Args('uid') uid: string): Promise<boolean> {
    await this.rolesService.deleteRole(uid);
    return true;
  }

  @Mutation(() => Int, { description: 'Delete many roles' })
  async deleteMultipleRoles(
    @Args({ name: 'uids', type: () => [String] }) uids: string[],
  ): Promise<number> {
    const deleteCount = await this.rolesService.deleteManyRoles(uids);
    return deleteCount;
  }
}
