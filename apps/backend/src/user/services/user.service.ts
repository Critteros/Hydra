import { Injectable } from '@nestjs/common';

import { makeCustomError } from '@hydra-ipxe/common/shared/errors';
import { Prisma, type User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import { PrismaService } from '@/db/prisma.service';
import { PrismaErrorCode, remapPrismaError } from '@/utils/prisma/errors';

export const UserAlreadyExistsError = makeCustomError('UserAlreadyExistsError');
export const UserNotFound = makeCustomError('UserNotFound');

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async find(where: Prisma.UserWhereUniqueInput): Promise<User | null> {
    return this.prisma.user.findUnique({ where });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { where, cursor, orderBy, take, skip } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createUser(data: Prisma.UserCreateInput, hashPassword = true): Promise<User> {
    let { password } = data;

    if (hashPassword) {
      password = await bcrypt.hash(password, 10);
    }
    try {
      return await this.prisma.user.create({
        data: {
          ...data,
          password,
        },
      });
    } catch (error) {
      throw remapPrismaError({
        error,
        toMatchError: Prisma.PrismaClientKnownRequestError,
        code: PrismaErrorCode.UniqueConstraintViolation,
        field: 'email',
        throw: new UserAlreadyExistsError(`User with email ${data.email} already exists`),
      });
    }
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    try {
      return await this.prisma.user.update({
        data,
        where,
      });
    } catch (error) {
      throw remapPrismaError({
        error,
        toMatchError: Prisma.PrismaClientKnownRequestError,
        code: PrismaErrorCode.RecordsNotFound,
        throw: new UserNotFound(`User with query ${JSON.stringify(where)} is not found`),
      });
    }
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    try {
      return await this.prisma.user.delete({
        where,
      });
    } catch (error) {
      throw remapPrismaError({
        error,
        toMatchError: Prisma.PrismaClientKnownRequestError,
        code: PrismaErrorCode.RecordsNotFound,
        throw: new UserNotFound(`User with query ${JSON.stringify(where)} is not found`),
      });
    }
  }

  async updateUserInfo(
    where: Prisma.UserWhereUniqueInput,
    data: Pick<Prisma.UserUpdateInput, 'email' | 'accountType' | 'name'>,
  ) {
    try {
      return await this.prisma.user.update({
        data,
        where,
      });
    } catch (error) {
      throw remapPrismaError({
        error,
        toMatchError: Prisma.PrismaClientKnownRequestError,
        code: PrismaErrorCode.RecordsNotFound,
        throw: new UserNotFound(`User with query ${JSON.stringify(where)} is not found`),
      });
    }
  }
}
