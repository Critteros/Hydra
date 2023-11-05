import { Injectable } from '@nestjs/common';

import { makeCustomError } from '@hydra-ipxe/common/shared/errors';
import { Prisma, type Permission, type User } from '@prisma/client';

import { PrismaService } from '@/db/prisma.service';
import { UserNotFound } from '@/user/services/user.service';
import { remapPrismaError, PrismaErrorCode } from '@/utils/prisma/errors';

export const RoleNotFoudError = makeCustomError('RoleNotFoundError');
export const RoleAlreadyExistsError = makeCustomError('RoleAlreadyExistsError');

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}

  /**
   * Returns the list of roles Provides also the count of users assigned to each role Provides the
   * number of permissions assigned to each role
   */
  async getRoles() {
    const roles = await this.prisma.role.findMany({
      select: {
        uid: true,
        name: true,
        description: true,
        members: {
          select: {
            userUid: true,
          },
        },
        permissions: {
          select: {
            permissionId: true,
          },
        },
      },
    });

    const rolesWithPermissionsCount = roles.map(({ members, permissions, ...rest }) => ({
      ...rest,
      permissionsCount: permissions.length,
      membersCount: members.length,
    }));

    return rolesWithPermissionsCount;
  }

  async getRole(where: Prisma.RoleWhereUniqueInput) {
    const role = await this.prisma.role.findUnique({
      where,
      select: {
        uid: true,
        name: true,
        description: true,
        members: {
          select: {
            userUid: true,
          },
        },
        permissions: {
          select: {
            permissionId: true,
          },
        },
      },
    });

    if (!role) {
      throw new RoleNotFoudError();
    }

    const roleWithPermissionsCount = {
      ...role,
      permissionsCount: role.permissions.length,
      membersCount: role.members.length,
    };

    return roleWithPermissionsCount;
  }

  async getUsersWithRole(roleUid: string) {
    const role = await this.prisma.role.findUnique({
      where: {
        uid: roleUid,
      },
      select: {
        members: {
          include: {
            user: {
              select: {
                accountType: true,
                email: true,
                name: true,
                uid: true,
              },
            },
          },
        },
      },
    });

    if (!role) {
      throw new RoleNotFoudError();
    }

    const users = role.members.map(({ user }) => user);
    return users;
  }

  async getRolesAssignedToAnUser(userUid: string) {
    const userRoles = await this.prisma.user.findUnique({
      where: {
        uid: userUid,
      },
      select: {
        roles: {
          select: {
            assignedAt: true,
            assignedBy: {
              select: {
                uid: true,
                email: true,
                name: true,
                accountType: true,
              },
            },
            role: {
              select: {
                uid: true,
                name: true,
                description: true,
              },
            },
          },
        },
      },
    });

    if (!userRoles) {
      throw new UserNotFound();
    }

    const roles = userRoles.roles.map(({ role, assignedAt, assignedBy }) => ({
      ...role,
      assignedAt: assignedAt,
      assignedBy: assignedBy,
    }));

    return roles;
  }

  async getAssignedPermissionsToRole(roleUid: string) {
    const role = await this.prisma.role.findUnique({
      where: {
        uid: roleUid,
      },
    });

    if (!role) {
      throw new RoleNotFoudError();
    }

    const data = await this.prisma.permissionsOnRoles.findMany({
      where: {
        role,
      },
      select: {
        permission: {
          select: {
            id: true,
            description: true,
          },
        },
        assignedAt: true,
        assignedBy: {
          select: {
            uid: true,
            email: true,
            name: true,
            accountType: true,
          },
        },
      },
    });

    const permissions = data.map(({ permission, assignedAt, assignedBy }) => ({
      ...permission,
      assignedAt: assignedAt,
      assignedBy: assignedBy,
    }));

    return permissions;
  }

  async createRole(roleData: Prisma.RoleCreateInput) {
    try {
      const role = await this.prisma.role.create({
        data: roleData,
      });

      return {
        ...role,
        membersCount: 0,
        permissionsCount: 0,
      };
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

  async deleteRole(roleUid: string) {
    const role = await this.prisma.role.findUnique({
      where: {
        uid: roleUid,
      },
    });

    if (!role) {
      throw new RoleNotFoudError();
    }

    await this.prisma.role.delete({
      where: {
        uid: roleUid,
      },
    });

    return role;
  }

  async deleteManyRoles(rolesUids: string[]) {
    const res = await this.prisma.role.deleteMany({
      where: {
        uid: {
          in: rolesUids,
        },
      },
    });

    return res.count;
  }

  async assignPermissionsToRole(
    whichRole: Prisma.RoleWhereUniqueInput,
    permissionIds: Permission['id'][],
    assignedByUid?: User['uid'],
  ) {
    const role = await this.prisma.role.findUnique({ where: whichRole });
    if (!role) {
      throw new RoleNotFoudError();
    }

    const data = permissionIds.map(
      (permissionId) =>
        ({
          permissionId,
          roleUid: role.uid,
          assignedByUid,
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

  async assignUsersToRole(
    whichRole: Prisma.RoleWhereUniqueInput,
    userUids: User['uid'][],
    assignedByUid?: User['uid'],
  ) {
    const role = await this.prisma.role.findUnique({ where: whichRole });

    if (!role) {
      throw new RoleNotFoudError();
    }

    const data = userUids.map(
      (userUid) =>
        ({
          userUid,
          roleUid: role.uid,
          assignedByUid,
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
