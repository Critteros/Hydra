import { Injectable } from '@nestjs/common';

import { makeCustomError } from '@hydra-ipxe/common/shared/errors';
import { Prisma } from '@prisma/client';

import { PrismaService } from '@/database/prisma.service';

export const ComputerNotFoundError = makeCustomError('ComputerNotFoundError');

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
    return await this.prisma.computer.create({ data });
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
