import { Injectable } from '@nestjs/common';

import { deduplicateArray } from '@hydra-ipxe/common/shared/object-utils';
import { Prisma } from '@prisma/client';

import { PrismaService } from '@/database/prisma.service';

import { RolesService } from './roles.service';

@Injectable()
export class PermissionService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly rolesService: RolesService,
  ) {}

  async findMany() {
    return await this.prisma.permission.findMany();
  }

  async getUserPermissions(where: Prisma.UserWhereUniqueInput) {
    const roles = await this.rolesService.getUserRoles(where);
    const rolesUids = roles.map(({ uid }) => uid);

    const records = await this.prisma.permissionsOnRoles.findMany({
      where: {
        roleUid: {
          in: rolesUids,
        },
      },
      include: {
        permission: true,
      },
    });
    const permissions = deduplicateArray(
      records.map(({ permission }) => ({ ...permission })),
      ({ id }) => id,
    );

    return permissions;
  }
}
