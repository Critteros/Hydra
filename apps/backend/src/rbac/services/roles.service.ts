import { Injectable } from '@nestjs/common';

import { makeCustomError } from '@hydra-ipxe/common/shared/errors';
import type { Prisma } from '@prisma/client';

import { PrismaService } from '@/db/prisma.service';
import { UserNotFound } from '@/user/services/user.service';

export const RoleNotFoudError = makeCustomError('RoleNotFoundError');

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
    const role = await this.prisma.role.create({
      data: roleData,
    });

    return {
      ...role,
      membersCount: 0,
      permissionsCount: 0,
    };
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
}
