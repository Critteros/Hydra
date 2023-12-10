import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { PrismaService, type PrismaTransaction } from '@/database/prisma.service';
import { remapPrismaError } from '@/utils/prisma/errors';

import { ComputerNotFoundError } from '../services/computer.service';
import { ComputerGroupNotFoundError } from '../services/computerGroup.service';
import { IpxeStrategyDoesNotExists } from '../services/ipxe-strategy.service';

@Injectable()
export class IpxeStrategySelectorService {
  constructor(private readonly prismaService: PrismaService) {}

  async getDirectComputerStrategy(
    { where }: { where: Prisma.ComputerWhereUniqueInput },
    tx?: PrismaTransaction,
  ) {
    return await this.prismaService.transactional(tx, async (tx) => {
      const computer = await tx.computer.findUnique({
        where,
        select: {
          strategy: true,
        },
      });
      if (!computer) {
        throw new ComputerNotFoundError('Computer not found');
      }

      return computer.strategy;
    });
  }

  async setComputerStrategy(
    {
      whereComputer,
      whereStrategy,
    }: {
      whereComputer: Prisma.ComputerWhereUniqueInput;
      whereStrategy?: Prisma.IpxeStrategyWhereUniqueInput | null;
    },
    tx?: PrismaTransaction,
  ) {
    return await this.prismaService.transactional(tx, async (tx) => {
      const computer = await tx.computer.findUnique({ where: whereComputer });
      if (!computer) {
        throw new ComputerNotFoundError('Computer not found');
      }
      if (whereStrategy) {
        try {
          return await tx.computer.update({
            where: whereComputer,
            data: {
              strategy: {
                connect: whereStrategy,
              },
            },
          });
        } catch (error) {
          // TODO: Determinate which error code prisma does throw in this place
          // if connect fails to find relation
          throw remapPrismaError({
            error,
            toMatchError: Prisma.PrismaClientKnownRequestError,
            throw: new IpxeStrategyDoesNotExists(),
          });
        }
      }

      return await tx.computer.update({
        where: whereComputer,
        data: {
          strategyUid: null,
        },
      });
    });
  }

  async getDirectComputerGroupStrategy(
    { where }: { where: Prisma.ComputerGroupWhereUniqueInput },
    tx?: PrismaTransaction,
  ) {
    return await this.prismaService.transactional(tx, async (tx) => {
      const computerGroup = await tx.computerGroup.findUnique({
        where,
        select: {
          strategy: true,
        },
      });
      if (!computerGroup) {
        throw new ComputerGroupNotFoundError('Computer group not found');
      }

      return computerGroup.strategy;
    });
  }

  async setComputerGroupStrategy(
    {
      whereComputerGroup,
      whereStrategy,
    }: {
      whereComputerGroup: Prisma.ComputerGroupWhereUniqueInput;
      whereStrategy?: Prisma.IpxeStrategyWhereUniqueInput | null;
    },
    tx?: PrismaTransaction,
  ) {
    return await this.prismaService.transactional(tx, async (tx) => {
      const computerGroup = await tx.computerGroup.findUnique({
        where: whereComputerGroup,
      });

      if (!computerGroup) {
        throw new ComputerGroupNotFoundError('Computer group not found');
      }

      if (whereStrategy) {
        try {
          return await tx.computerGroup.update({
            where: whereComputerGroup,
            data: {
              strategy: {
                connect: whereStrategy,
              },
            },
          });
        } catch (error) {
          throw remapPrismaError({
            error,
            toMatchError: Prisma.PrismaClientKnownRequestError,
            throw: new IpxeStrategyDoesNotExists(),
          });
        }
      }

      return await tx.computerGroup.update({
        where: whereComputerGroup,
        data: {
          strategyUid: null,
        },
      });
    });
  }

  async getGlobalStrategy(tx?: PrismaTransaction) {
    return await this.prismaService.transactional(tx, async (tx) => {
      const globalEntry = await tx.globalIpxeStrategy.findFirst({ select: { strategy: true } });
      return globalEntry?.strategy ?? null;
    });
  }

  async setGlobalStrategy(
    { whichStrategy }: { whichStrategy?: Prisma.IpxeStrategyWhereUniqueInput | null },
    tx?: PrismaTransaction,
  ) {
    return await this.prismaService.transactional(tx, async (tx) => {
      const globalStrategy = await tx.globalIpxeStrategy.findFirst();
      let newStrategyUid = null;
      if (whichStrategy) {
        const strategy = await tx.ipxeStrategy.findUnique({
          where: whichStrategy,
          select: { uid: true },
        });
        if (!strategy) {
          throw new IpxeStrategyDoesNotExists('Strategy does not exists');
        }
        newStrategyUid = strategy.uid;
      }
      if (!globalStrategy) {
        return await tx.globalIpxeStrategy
          .create({
            data: {
              strategyUid: newStrategyUid,
            },
            select: {
              strategy: true,
            },
          })
          .then(({ strategy }) => strategy);
      }

      return await tx.globalIpxeStrategy
        .update({
          where: {
            id: globalStrategy.id,
          },
          data: {
            strategyUid: newStrategyUid,
          },
          select: {
            strategy: true,
          },
        })
        .then(({ strategy }) => strategy);
    });
  }

  async resolveStrategyForComputer(
    { where }: { where: Prisma.ComputerWhereUniqueInput },
    tx?: PrismaTransaction,
  ) {
    return await this.prismaService.transactional(tx, async (tx) => {
      const computerData = await tx.computer.findUnique({
        where,
        select: {
          strategy: true,
          computerGroup: {
            select: {
              strategy: true,
            },
          },
        },
      });

      if (!computerData) {
        throw new ComputerNotFoundError('Computer was not found');
      }

      // 1) Return computer strategy if present
      if (computerData.strategy) {
        return computerData.strategy;
      }

      // 2) Fallback to computerGroup strategy if present
      if (computerData?.computerGroup?.strategy) {
        return computerData.computerGroup.strategy;
      }

      // 3) Fallback to global strategy
      return await this.getGlobalStrategy(tx);
    });
  }
}
