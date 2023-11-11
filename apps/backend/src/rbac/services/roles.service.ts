import { Injectable } from '@nestjs/common';

import { makeCustomError } from '@hydra-ipxe/common/shared/errors';
import { Prisma, type Permission, type User, Role } from '@prisma/client';

import { PrismaService } from '@/database/prisma.service';
import { UserNotFound } from '@/user/services/user.service';
import { exclude } from '@/utils/objects';
import { remapPrismaError, PrismaErrorCode } from '@/utils/prisma/errors';

export const RoleNotFoudError = makeCustomError('RoleNotFoundError');
export const RoleAlreadyExistsError = makeCustomError('RoleAlreadyExistsError');

@Injectable()
export class RolesService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Returns the list of roles Provides also the count of users assigned to each role Provides the
   * number of permissions assigned to each role
   *
   * @returns List of roles
   */
  async listRoles() {
    return await this.prisma.role.findMany({
      select: {
        uid: true,
        name: true,
        description: true,
      },
    });
  }

  /**
   * Returns a single role
   *
   * @param where Role selector
   * @returns Role or null if not found
   */
  async getRole(where: Prisma.RoleWhereUniqueInput) {
    const role = await this.prisma.role.findUnique({
      where,
      select: {
        uid: true,
        name: true,
        description: true,
      },
    });

    return role;
  }

  /**
   * Returns the list of users assigned to a given role
   *
   * @param whereRole Role selector
   * @returns List of users assigned to a given role
   * @throws RoleNotFoundError if the role is not found
   */
  async getUsersWithRole(whereRole: Prisma.RoleWhereUniqueInput) {
    const role = await this.prisma.role.findUnique({ where: whereRole });

    if (!role) {
      throw new RoleNotFoudError(`Role with selector ${JSON.stringify(whereRole)} not found`);
    }

    const records = await this.prisma.rolesOnUser.findMany({
      where: {
        roleUid: role.uid,
      },
      include: {
        user: true,
      },
    });

    const users = records.map(({ user }) => exclude(user, ['password']));
    return users;
  }

  /**
   * Counts the number of users assigned to a given role
   *
   * @param whereRole Role selector
   * @returns Count of users assigned to a given role
   * @throws RoleNotFoundError if the role is not found
   */
  async countUsersWithRole(whereRole: Prisma.RoleWhereUniqueInput) {
    const role = await this.prisma.role.findUnique({ where: whereRole });

    if (!role) {
      throw new RoleNotFoudError(`Role with selector ${JSON.stringify(whereRole)} not found`);
    }

    const count = await this.prisma.rolesOnUser.count({
      where: {
        roleUid: role.uid,
      },
    });

    return count;
  }

  /**
   * Returns all roles for a given user
   *
   * @param whereUser User selector
   * @returns List of roles assigned to a given user
   * @throws UserNotFound if the user is not found
   */
  async getUserRoles(whereUser: Prisma.UserWhereUniqueInput) {
    const user = await this.prisma.user.findUnique({ where: whereUser });

    if (!user) {
      throw new UserNotFound();
    }

    const records = await this.prisma.rolesOnUser.findMany({
      where: {
        userUid: user.uid,
      },
      include: {
        role: true,
      },
    });

    const roles = records.map(({ role }) => role);

    return roles;
  }

  /**
   * Get the list of permissions assigned to a given role
   *
   * @param whereRole Role selector
   * @returns List of permissions assigned to a given role
   * @throws RoleNotFoundError if the role is not found
   */
  async getRolePermissions(whereRole: Prisma.RoleWhereUniqueInput) {
    const role = await this.prisma.role.findUnique({
      where: whereRole,
    });

    if (!role) {
      throw new RoleNotFoudError();
    }

    const records = await this.prisma.permissionsOnRoles.findMany({
      where: {
        roleUid: role.uid,
      },
      include: {
        permission: true,
        assignedBy: true,
      },
    });

    const permissions = records.map(({ permission, assignedBy, assignedAt }) => ({
      ...permission,
      assignedBy: assignedBy ? exclude(assignedBy, ['password']) : null,
      assignedAt,
    }));

    return permissions;
  }

  /**
   * Returns the number of users assigned to a given role
   *
   * @param whereRole Role selector
   * @returns Count of users assigned to a given role
   * @throws RoleNotFoundError if the role is not found
   */
  async countRolePermissions(whereRole: Prisma.RoleWhereUniqueInput) {
    const role = await this.prisma.role.findUnique({
      where: whereRole,
    });

    if (!role) {
      throw new RoleNotFoudError();
    }

    const count = await this.prisma.permissionsOnRoles.count({
      where: {
        roleUid: role.uid,
      },
    });

    return count;
  }

  /**
   * Creates a new role
   *
   * @param roleData Role data
   * @returns Created role
   * @throws RoleAlreadyExistsError if the role already exists
   */
  async createRole(roleData: Prisma.RoleCreateInput) {
    try {
      return await this.prisma.role.create({
        data: roleData,
      });
    } catch (error) {
      throw remapPrismaError({
        error,
        toMatchError: Prisma.PrismaClientKnownRequestError,
        code: PrismaErrorCode.UniqueConstraintViolation,
        field: 'name',
        throw: new RoleAlreadyExistsError(`Role with name ${roleData.name} already exists`),
      });
    }
  }

  /**
   * Deletes a role
   *
   * @param whereRole Role selector
   * @returns Deleted role
   * @throws RoleNotFoundError if the role is not found
   */
  async deleteRole(whereRole: Prisma.RoleWhereUniqueInput) {
    const role = await this.prisma.role.findUnique({
      where: whereRole,
    });

    if (!role) {
      throw new RoleNotFoudError();
    }

    await this.prisma.role.delete({
      where: whereRole,
    });

    return role;
  }

  /**
   * Deletes multiple roles at once
   *
   * @param params Parameters
   * @param params.rolesUids List of roles to delete
   * @returns Number of deleted roles
   */
  async deleteManyRoles({ rolesUids }: { rolesUids: Array<Role['uid']> }) {
    const res = await this.prisma.role.deleteMany({
      where: {
        uid: {
          in: rolesUids,
        },
      },
    });

    return res.count;
  }

  /**
   * Assigns permissions to a role
   *
   * @param params Parameters
   * @param params.role Role selector
   * @param params.permissionsIds List of permissions to assign to the role
   * @param params.assignedByUser User who assigned the permissions
   * @returns Count of permissions assigned to the role
   * @throws RoleNotFoundError if the role is not found
   */
  async assignPermissionsToRole({
    role: whichRole,
    permissionsIds,
    assignedByUser,
  }: {
    role: Prisma.RoleWhereUniqueInput;
    permissionsIds: Array<Permission['id']>;
    assignedByUser?: Prisma.UserWhereUniqueInput;
  }) {
    const role = await this.prisma.role.findUnique({ where: whichRole });
    if (!role) {
      throw new RoleNotFoudError();
    }
    const userWhoAssigned = assignedByUser
      ? await this.prisma.user.findUnique({ where: assignedByUser })
      : null;

    const data = permissionsIds.map(
      (permissionId) =>
        ({
          permissionId,
          roleUid: role.uid,
          assignedByUid: userWhoAssigned?.uid ?? null,
        }) satisfies Prisma.PermissionsOnRolesCreateManyInput,
    );

    const res = await this.prisma.$transaction([
      this.prisma.permissionsOnRoles.deleteMany({
        where: {
          roleUid: role.uid,
        },
      }),
      this.prisma.permissionsOnRoles.createMany({
        data,
      }),
    ]);
    const { count } = res[1];

    return count;
  }

  /**
   * Assigns users to a role
   *
   * @param params Parameters
   * @param params.role Role selector
   * @param params.userUids List of users to assign to the role
   * @param params.assignedByUser User who assigned the users
   * @returns Count of users assigned to the role
   * @throws RoleNotFoundError if the role is not found
   */
  async assignUsersToRole({
    role: whichRole,
    userUids,
    assignedByUser,
  }: {
    role: Prisma.RoleWhereUniqueInput;
    userUids: Array<User['uid']>;
    assignedByUser?: Prisma.UserWhereUniqueInput;
  }) {
    const role = await this.prisma.role.findUnique({ where: whichRole });

    if (!role) {
      throw new RoleNotFoudError();
    }

    const userWhoAssigned = assignedByUser
      ? await this.prisma.user.findUnique({ where: assignedByUser })
      : null;

    const data = userUids.map(
      (userUid) =>
        ({
          userUid,
          roleUid: role.uid,
          assignedByUid: userWhoAssigned?.uid ?? null,
        }) satisfies Prisma.RolesOnUserCreateManyInput,
    );

    const res = await this.prisma.$transaction([
      this.prisma.rolesOnUser.deleteMany({
        where: {
          roleUid: role.uid,
        },
      }),
      this.prisma.rolesOnUser.createMany({
        data,
      }),
    ]);

    const { count } = res[1];

    return count;
  }
}
