import { BadRequestException } from '@nestjs/common';
import { Resolver, Query, Parent, ResolveField, Mutation, Args, Int } from '@nestjs/graphql';

import { MapErrors } from '@/errors/map-errors.decorator';
import { RequirePermission } from '@/rbac/decorators/require-permissions.decorator';
import { User as InjectUser } from '@/user/decorators/user.decorator';
import { User } from '@/user/schemas/user.object';

import { AssignedPermission } from '../schemas/assigned-permission.object';
import { CreateRoleInput } from '../schemas/create-role.input';
import { RoleSelectionArgs } from '../schemas/role-selection.args';
import { Role } from '../schemas/roles.object';
import { RolesService, RoleNotFoudError, RoleAlreadyExistsError } from '../services/roles.service';

@Resolver(() => Role)
export class RolesResolver {
  constructor(private rolesService: RolesService) {}

  // ================================ Queries ================================

  @Query(() => [Role], { description: 'Get all roles' })
  @RequirePermission('roles.read')
  async roles() {
    const roles = await this.rolesService.listRoles();

    return roles;
  }

  @Query(() => Role, { description: 'Get a single role', nullable: true })
  @RequirePermission('roles.read')
  async role(@Args() { uid, name }: RoleSelectionArgs) {
    return await this.rolesService.getRole({ uid, name });
  }

  // ================================ Mutations ================================

  @Mutation(() => Role, { description: 'Create a new role' })
  @MapErrors({
    if: RoleAlreadyExistsError,
    then: () => new BadRequestException('Role already exists'),
  })
  @RequirePermission('roles.create')
  async createRole(@Args('data') { description, name }: CreateRoleInput) {
    return await this.rolesService.createRole({ description, name });
  }

  @Mutation(() => Boolean, { description: 'Delete a role' })
  @MapErrors([
    {
      if: RoleNotFoudError,
      then: () => new BadRequestException('Role not found'),
    },
  ])
  @RequirePermission('roles.delete')
  async deleteRole(@Args() { uid, name }: RoleSelectionArgs): Promise<boolean> {
    await this.rolesService.deleteRole({ uid, name });
    return true;
  }

  @Mutation(() => Int, { description: 'Delete many roles' })
  @RequirePermission('roles.delete')
  async deleteMultipleRoles(
    @Args({ name: 'uids', type: () => [String] }) uids: string[],
  ): Promise<number> {
    return await this.rolesService.deleteManyRoles({ rolesUids: uids });
  }

  @Mutation(() => Boolean, { description: 'Assign permissions to a role' })
  @RequirePermission('roles.assignPermissions')
  async assignPermissionsToRole(
    @Args() { uid, name }: RoleSelectionArgs,
    @Args({ name: 'permissionIds', type: () => [String] }) permissionIds: string[],
    @InjectUser() user: User,
  ) {
    const res = await this.rolesService.assignPermissionsToRole({
      role: {
        uid,
        name,
      },
      permissionsIds: permissionIds,
      assignedByUser: {
        uid: user.uid,
      },
    });

    return res;
  }

  @Mutation(() => Boolean, { description: 'Assign users to a role' })
  @RequirePermission('roles.assignUsers')
  async assignUsersToRole(
    @Args() { uid, name }: RoleSelectionArgs,
    @Args({ name: 'userUids', type: () => [String] }) userUids: string[],
    @InjectUser() user: User,
  ) {
    const res = await this.rolesService.assignUsersToRole({
      role: {
        uid,
        name,
      },
      userUids,
      assignedByUser: {
        uid: user.uid,
      },
    });

    return res;
  }

  // ================================ Resolvers ================================

  @ResolveField(() => [User])
  async members(@Parent() { uid }: Role) {
    return await this.rolesService.getUsersWithRole({ uid });
  }

  @ResolveField(() => Int)
  async memberCount(@Parent() parent: Role) {
    return await this.rolesService.countUsersWithRole({ uid: parent.uid });
  }

  @ResolveField(() => [AssignedPermission])
  async permissions(@Parent() { uid }: Role) {
    return await this.rolesService.getRolePermissions({ uid });
  }

  @ResolveField(() => Int)
  async permissionsCount(@Parent() parent: Role) {
    return await this.rolesService.countRolePermissions({ uid: parent.uid });
  }
}
