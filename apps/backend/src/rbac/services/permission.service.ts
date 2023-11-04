import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/db/prisma.service';

@Injectable()
export class PermissionService {
  constructor(private readonly prisma: PrismaService) {}

  async getPermissions() {
    return await this.prisma.permission.findMany();
  }
}
