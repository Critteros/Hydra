import { Injectable } from '@nestjs/common';

import { makeCustomError } from '@hydra-ipxe/common/shared/errors';
import { Prisma } from '@prisma/client';

import { PrismaService } from '@/database/prisma.service';
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
