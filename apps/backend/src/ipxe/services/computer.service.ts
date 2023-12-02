import { Injectable } from '@nestjs/common';

import { makeCustomError } from '@hydra-ipxe/common/shared/errors';
import { Prisma, type Computer } from '@prisma/client';

import { PrismaService, type PrismaTransaction } from '@/database/prisma.service';
import { remapPrismaError, prismaErrorSwitch, PrismaErrorCode } from '@/utils/prisma/errors';

export const ComputerNotFoundError = makeCustomError('ComputerNotFoundError');
export const ComputerNameAlreadyExistsError = makeCustomError('ComputerNameAlreadyExistsError');
export const ComputerMacAlreadyExistsError = makeCustomError('ComputerMacAlreadyExistsError');
export const ComputerIpV4AlreadyExistsError = makeCustomError('ComputerIpV4AlreadyExistsError');

@Injectable()
export class ComputerService {
  constructor(private readonly prisma: PrismaService) {}

  async find(where: Prisma.ComputerWhereUniqueInput) {
    return await this.prisma.computer.findUnique({ where });
  }

  async findMany(select?: Prisma.ComputerFindManyArgs) {
    return await this.prisma.computer.findMany(select);
  }

  async viewOptions(where: Prisma.ComputerViewOptionsWhereUniqueInput) {
    return await this.prisma.computerViewOptions.findUnique({ where });
  }

  async createComputer(data: Prisma.ComputerCreateInput) {
    try {
      return await this.prisma.computer.create({ data });
    } catch (e) {
      throw prismaErrorSwitch(e, [
        (e) =>
          remapPrismaError({
            error: e,
            toMatchError: Prisma.PrismaClientKnownRequestError,
            code: PrismaErrorCode.UniqueConstraintViolation,
            field: 'name',
            throw: new ComputerNameAlreadyExistsError(
              `Computer with name ${data.name} already exists`,
            ),
          }),
        (e) =>
          remapPrismaError({
            error: e,
            toMatchError: Prisma.PrismaClientKnownRequestError,
            code: PrismaErrorCode.UniqueConstraintViolation,
            field: 'mac',
            throw: new ComputerMacAlreadyExistsError(
              `Computer with mac ${data.mac} already exists`,
            ),
          }),
        (e) =>
          remapPrismaError({
            error: e,
            toMatchError: Prisma.PrismaClientKnownRequestError,
            code: PrismaErrorCode.UniqueConstraintViolation,
            field: 'ipV4',
            throw: new ComputerIpV4AlreadyExistsError(
              `Computer with ipV4 ${data.ipv4} already exists`,
            ),
          }),
      ]);
    }
  }

  /**
   * Updates computer order in a group to match a new given order value If a computer does not
   * belong to any group it will be sorted with other non grouped computers If computer does not
   * have viewOptions it will be created
   *
   * @param whichComputer
   * @param transaction
   */
  async updateComputerOrder(
    {
      whichComputer,
      order,
      computerWasMoved,
    }: { whichComputer: Prisma.ComputerWhereUniqueInput; order: number; computerWasMoved: boolean },
    transaction?: PrismaTransaction,
  ) {
    return await this.prisma.transactional(transaction, async (tx) => {
      const computer = await tx.computer.findUnique({
        where: whichComputer,
        select: {
          uid: true,
          computerGroupId: true,
          viewOptions: {
            select: {
              order: true,
            },
          },
        },
      });

      if (!computer) throw new ComputerNotFoundError();
      const { computerGroupId, uid: computerUid, viewOptions } = computer;
      const oldIndex = computerWasMoved ? null : viewOptions?.order ?? null;

      const commonSelector = [
        {
          computer: {
            uid: {
              not: computerUid,
            },
          },
        },
        {
          computer: {
            computerGroupId: {
              equals: computerGroupId,
            },
          },
        },
      ] as const;

      if (oldIndex === null) {
        // Computer which we are operating on was recently moved from another group
        // meaning that it's order is of no use so we consider it as new in the group
        // we new to increment all order values greater or equal to the new order value
        await tx.computerViewOptions.updateMany({
          where: {
            AND: [
              {
                order: {
                  gte: order,
                },
              },
              ...commonSelector,
            ],
          },
          data: {
            order: {
              increment: 1,
            },
          },
        });
      } else if (oldIndex === order) {
        // Computer was not moved and it's order did not change
        // no need to update anything
        return;
      } else if (oldIndex < order) {
        // We need to decrement [oldIndex+1, newIndex] range
        await tx.computerViewOptions.updateMany({
          where: {
            AND: [
              {
                order: {
                  gte: oldIndex + 1,
                },
              },
              {
                order: {
                  lte: order,
                },
              },
              ...commonSelector,
            ],
          },
          data: {
            order: {
              decrement: 1,
            },
          },
        });
      } else {
        // We need to increment [newIndex, oldIndex-1] range
        await tx.computerViewOptions.updateMany({
          where: {
            AND: [
              {
                order: {
                  gte: order,
                },
              },
              {
                order: {
                  lte: oldIndex - 1,
                },
              },
              ...commonSelector,
            ],
          },
          data: {
            order: {
              increment: 1,
            },
          },
        });
      }
      // Update target computer viewOptions
      await tx.computerViewOptions.upsert({
        where: {
          computerId: computerUid,
        },
        create: {
          computer: {
            connect: {
              uid: computerUid,
            },
          },
          order,
        },
        update: {
          order,
        },
      });

      // Sort computers in group
      await this.updateComputerGroupOrdering(computerGroupId, tx);
    });
  }

  /**
   * Updates ordering of computers in a group so they they will be ordered sequentially If a
   * computer does not belong to any group it will be sorted with other non grouped computers
   *
   * @param groupUid
   * @param transaction
   * @returns
   */
  async updateComputerGroupOrdering(
    groupUid: Computer['computerGroupId'],
    transaction?: PrismaTransaction,
  ) {
    return this.prisma.transactional(transaction, async (tx: PrismaTransaction) => {
      const data = await tx.computer.findMany({
        where: {
          computerGroupId: groupUid,
        },
        select: {
          uid: true,
          viewOptions: {
            select: {
              order: true,
            },
          },
        },
        orderBy: {
          viewOptions: {
            order: 'asc',
          },
        },
      });

      const [ordered, unordered] = data.reduce(
        ([ordered, unordered], computer) => {
          if (computer?.viewOptions?.order != null) {
            ordered.push(computer);
          } else {
            unordered.push(computer);
          }
          return [ordered, unordered];
        },
        [[] as typeof data, [] as typeof data],
      );
      ordered.sort((a, b) => a.viewOptions!.order - b.viewOptions!.order);

      const sortedComputers = ordered.map(({ uid }, index) => ({
        uid,
        order: index,
      }));
      const nextOrderIndex = sortedComputers.at(-1)?.order ?? 0;
      unordered.forEach(({ uid }, index) => {
        sortedComputers.push({
          uid,
          order: nextOrderIndex + index,
        });
      });

      const updatePromises = sortedComputers.map(({ uid, order }) => {
        return tx.computerViewOptions.upsert({
          where: {
            computerId: uid,
          },
          create: {
            order,
            computer: {
              connect: {
                uid,
              },
            },
          },
          update: {
            order,
          },
        });
      });

      return await Promise.all(updatePromises);
    });
  }

  async deleteComputers(where: Prisma.ComputerWhereInput) {
    return await this.prisma.computer.deleteMany({ where });
  }

  async changeComputerViewOptions(
    where: Prisma.ComputerWhereUniqueInput,
    updateData: Omit<Prisma.ComputerViewOptionsCreateInput, 'computer'>,
  ) {
    const computer = await this.prisma.computer.findUnique({ where });
    if (!computer) throw new ComputerNotFoundError();

    return await this.prisma.computerViewOptions.upsert({
      where: { computerId: computer.uid },
      create: {
        order: updateData.order,
        computer: {
          connect: {
            uid: computer.uid,
          },
        },
      },
      update: {
        ...updateData,
      },
    });
  }
}
