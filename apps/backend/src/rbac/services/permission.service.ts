import { Injectable } from '@nestjs/common';

import type { Permissions } from '@hydra-ipxe/common/shared/permissions';

import { PrismaService } from '@/db/prisma.service';
import { UserNotFound } from '@/user/services/user.service';

@Injectable()
export class PermissionService {
  constructor(private readonly prisma: PrismaService) {}

  async getPermissions() {
    return await this.prisma.permission.findMany();
  }

  async getUserPermissions(userUid: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        uid: userUid,
      },
      select: {
        roles: {
          select: {
            role: {
              select: {
                permissions: {
                  select: {
                    permission: {
                      select: {
                        id: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!user) {
      throw new UserNotFound();
    }

    const permissions = user.roles.flatMap(({ role }) => {
      return role.permissions.map(({ permission }) => permission.id);
    });

    const uniquePermissions = [...new Set(permissions)];

    return uniquePermissions as Permissions[];
  }
}
