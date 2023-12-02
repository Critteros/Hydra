import { Injectable } from '@nestjs/common';

import { makeCustomError } from '@hydra-ipxe/common/shared/errors';
import { Prisma, type Computer } from '@prisma/client';

import { PrismaService, type PrismaTransaction } from '@/database/prisma.service';
import { PrismaErrorCode, remapPrismaError } from '@/utils/prisma/errors';

import { ComputerService, ComputerNotFoundError } from './computer.service';

export const ComputerGroupNotFoundError = makeCustomError('ComputerGroupNotFoundError');
export const ComputerGroupNameAlreadyExistsError = makeCustomError(
  'ComputerGroupNameAlreadyExistsError',
);

@Injectable()
export class ComputerGroupService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly computerService: ComputerService,
  ) {}

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
    try {
      return await this.prisma.computerGroup.create({ data });
    } catch (error) {
      throw remapPrismaError({
        error,
        toMatchError: Prisma.PrismaClientKnownRequestError,
        code: PrismaErrorCode.UniqueConstraintViolation,
        field: 'name',
        throw: new ComputerGroupNameAlreadyExistsError(
          `Computer group with name ${data.name} already exists`,
        ),
      });
    }
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

  async moveComputerAndUpdateOrder(
    {
      toGroupUid,
      whichComputer,
      newOrder,
    }: {
      toGroupUid: Computer['computerGroupId'];
      whichComputer: Prisma.ComputerWhereUniqueInput;
      newOrder: number;
    },
    transaction?: PrismaTransaction,
  ) {
    return await this.prisma.transactional(transaction, async (tx) => {
      const computer = await tx.computer.findUnique({
        where: whichComputer,
        select: {
          uid: true,
          computerGroupId: true,
        },
      });

      if (!computer) {
        throw new ComputerNotFoundError('Requested computer was not found');
      }

      const fromGroupUid = computer.computerGroupId;

      if (toGroupUid !== null) {
        const toGroup = await tx.computerGroup.findUnique({
          where: { uid: toGroupUid },
          select: { uid: true },
        });
        if (!toGroup) {
          throw new ComputerGroupNotFoundError('Destination computer group was not found');
        }
      }

      if (fromGroupUid === toGroupUid) {
        // We need only to update the group order
        await this.computerService.updateComputerOrder(
          { whichComputer: { uid: computer.uid }, order: newOrder, computerWasMoved: false },
          tx,
        );
        return;
      }

      // Disconnect computer from the old group
      if (fromGroupUid !== null) {
        await tx.computerGroup.update({
          where: { uid: fromGroupUid },
          data: {
            computers: {
              disconnect: {
                uid: computer.uid,
              },
            },
          },
        });
      }

      // Connect computer to the new group or set to null
      if (toGroupUid !== null) {
        await tx.computerGroup.update({
          where: { uid: toGroupUid },
          data: {
            computers: {
              connect: {
                uid: computer.uid,
              },
            },
          },
        });
      } else {
        await tx.computer.update({
          where: { uid: computer.uid },
          data: {
            computerGroupId: null,
          },
        });
      }

      // Update ordering in both groups
      await Promise.all([
        // Update in new group
        this.computerService.updateComputerOrder(
          { whichComputer: { uid: computer.uid }, order: newOrder, computerWasMoved: true },
          tx,
        ),
        // Update old group order
        this.computerService.updateComputerGroupOrdering(fromGroupUid, tx),
      ]);
    });
  }

  async moveComputers(
    {
      from,
      to,
      computers,
    }: {
      from: Prisma.ComputerGroupWhereUniqueInput;
      to: Prisma.ComputerGroupWhereUniqueInput;
      computers: Prisma.ComputerWhereInput;
    },
    transaction?: PrismaTransaction,
  ) {
    return await this.prisma.transactional(transaction, async (tx) => {
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
