import { Injectable } from '@nestjs/common';

import { makeCustomError } from '@hydra-ipxe/common/shared/errors';
import { Prisma } from '@prisma/client';

import { PrismaService } from '@/database/prisma.service';

export const ComputerGroupNotFoundError = makeCustomError('ComputerGroupNotFoundError');

@Injectable()
export class ComputerGroupService {
  constructor(private readonly prisma: PrismaService) {}

  async find(where: Prisma.ComputerGroupWhereUniqueInput) {
    return await this.prisma.computerGroup.findUnique({ where });
  }

  async findMany(select?: Prisma.ComputerGroupFindManyArgs) {
    return await this.prisma.computerGroup.findMany(select);
  }

  async viewOptions(where: Prisma.ComputerGroupViewOptionsWhereUniqueInput) {
    return await this.prisma.computerGroupViewOptions.findUnique({ where });
  }

  async createComputerGroup(data: Prisma.ComputerGroupCreateInput) {
    return await this.prisma.computerGroup.create({ data });
  }

  async changeComputerGroupViewOptions(
    where: Prisma.ComputerGroupWhereUniqueInput,
    updateData: Omit<Prisma.ComputerGroupViewOptionsCreateInput, 'computerGroup'>,
  ) {
    const computerGroup = await this.prisma.computerGroup.findUnique({ where });
    if (!computerGroup) throw new ComputerGroupNotFoundError();

    return await this.prisma.computerGroupViewOptions.upsert({
      where: { computerGroupId: computerGroup.uid },
      create: {
        order: updateData.order,
        computerGroup: {
          connect: {
            uid: computerGroup.uid,
          },
        },
      },
      update: {
        ...updateData,
      },
    });
  }

  async addComputersToGroup(
    where: Prisma.ComputerGroupWhereUniqueInput,
    computers: Prisma.ComputerWhereInput,
  ) {
    const computerGroup = await this.prisma.computerGroup.findUnique({
      where,
      select: { uid: true },
    });
    if (!computerGroup) throw new ComputerGroupNotFoundError();

    return await this.prisma.$transaction(async (tx) => {
      const computerIdentifiers = await tx.computer.findMany({
        where: computers,
        select: {
          uid: true,
        },
      });

      return await tx.computerGroup.update({
        where: { uid: computerGroup.uid },
        data: {
          computers: {
            connect: computerIdentifiers,
          },
        },
      });
    });
  }

  async removeComputersFromGroup(
    where: Prisma.ComputerGroupWhereUniqueInput,
    computers: Prisma.ComputerWhereInput,
  ) {
    const computerGroup = await this.prisma.computerGroup.findUnique({
      where,
      select: { uid: true },
    });
    if (!computerGroup) throw new ComputerGroupNotFoundError();

    return await this.prisma.$transaction(async (tx) => {
      const computerIdentifiers = await tx.computer.findMany({
        where: computers,
        select: {
          uid: true,
        },
      });

      return await tx.computerGroup.update({
        where: { uid: computerGroup.uid },
        data: {
          computers: {
            disconnect: computerIdentifiers,
          },
        },
      });
    });
  }

  async moveComputers({
    from,
    to,
    computers,
  }: {
    from: Prisma.ComputerGroupWhereUniqueInput;
    to: Prisma.ComputerGroupWhereUniqueInput;
    computers: Prisma.ComputerWhereInput;
  }) {
    return await this.prisma.$transaction(async (tx) => {
      const firstComputerGroup = await tx.computerGroup.findUnique({
        where: from,
        select: { uid: true },
      });
      if (!firstComputerGroup) throw new ComputerGroupNotFoundError();

      const secondComputerGroup = await tx.computerGroup.findUnique({
        where: to,
        select: { uid: true },
      });
      if (!secondComputerGroup) throw new ComputerGroupNotFoundError();

      const computerIdentifiers = await tx.computer.findMany({
        where: computers,
        select: {
          uid: true,
        },
      });

      await tx.computerGroup.update({
        where: { uid: firstComputerGroup.uid },
        data: {
          computers: {
            disconnect: computerIdentifiers,
          },
        },
      });

      await tx.computerGroup.update({
        where: { uid: secondComputerGroup.uid },
        data: {
          computers: {
            connect: computerIdentifiers,
          },
        },
      });

      return await tx.computer.findMany({
        where: computers,
      });
    });
  }

  async queryComputersForGroup(
    where: Prisma.ComputerGroupWhereUniqueInput,
    select?: Prisma.ComputerSelect,
  ) {
    const computerGroup = await this.prisma.computerGroup.findUnique({
      where,
      select: { uid: true },
    });
    if (!computerGroup) throw new ComputerGroupNotFoundError();

    return await this.prisma.computer.findMany({
      where: {
        computerGroupId: computerGroup.uid,
      },
      select,
    });
  }

  async deleteComputerGroups(where: Prisma.ComputerGroupWhereInput) {
    return await this.prisma.computerGroup.deleteMany({ where });
  }
}
