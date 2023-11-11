import { Injectable } from '@nestjs/common';

import { makeCustomError } from '@hydra-ipxe/common/shared/errors';
import { Prisma, type User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import { PrismaService } from '@/database/prisma.service';
import { PrismaErrorCode, remapPrismaError } from '@/utils/prisma/errors';

export const UserAlreadyExistsError = makeCustomError('UserAlreadyExistsError');
export const UserNotFound = makeCustomError('UserNotFound');
export const UserPasswordDoesNotMatch = makeCustomError('UserPasswordDoesNotMatch');

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Finds a user by unique identifier
   *
   * @param where User selector
   * @returns User or null if not found
   */
  async find(where: Prisma.UserWhereUniqueInput): Promise<User | null> {
    return this.prisma.user.findUnique({ where });
  }

  /**
   * Finds multiple users
   *
   * @param params Parameters
   * @param params.skip Number of records to skip
   * @param params.take Number of records to take
   * @param params.cursor Cursor to use for pagination
   * @param params.where Where clause
   * @param params.orderBy Order by clause
   * @returns Found users
   */
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

  /**
   * Creates user
   *
   * @param data User data
   * @param hashPassword If the password should be hashed
   * @returns User
   */
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

  /**
   * Updated user data
   *
   * @param params Parameters
   * @param params.where User selector
   * @param params.data User data
   * @returns User
   * @throws UserNotFound if user is not found
   */
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

  /**
   * Delete single user
   *
   * @param where User selector
   * @returns Deleted user
   * @throws UserNotFound if user is not found
   */
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

  /**
   * Deletes multiple users
   *
   * @param params Parameters
   * @param params.userUids User uids to be deleted
   * @returns Number of deleted users
   */
  async deleteMultipleUsers({ userUids }: { userUids: Array<User['uid']> }) {
    const res = await this.prisma.user.deleteMany({
      where: {
        uid: {
          in: userUids,
        },
      },
    });

    return res.count;
  }

  /**
   * Updates user profile information
   *
   * @param where User selector
   * @param data Data to be updated
   * @returns User
   * @throws UserNotFound if user is not found
   */
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

  /**
   * Updates password if the old password matches
   *
   * @param where User selector
   * @param params Parameters
   * @param params.oldPassword Old password
   * @param params.newPassword New password
   * @returns User
   * @throws UserNotFound if user is not found
   */
  async updatePasswordChecked(
    where: Prisma.UserWhereUniqueInput,
    {
      oldPassword,
      newPassword,
    }: {
      oldPassword: Prisma.UserCreateInput['password'];
      newPassword: Prisma.UserCreateInput['password'];
    },
  ) {
    const user = await this.prisma.user.findFirst({
      where,
    });

    if (!user) {
      throw new UserNotFound(`User with query ${JSON.stringify(where)} is not found`);
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordValid) {
      throw new UserPasswordDoesNotMatch('Invalid password');
    }

    const password = await bcrypt.hash(newPassword, 10);

    return this.prisma.user.update({
      where: {
        uid: user.uid,
      },
      data: {
        password,
      },
    });
  }

  /**
   * Forcefully updates password without checking the old password
   *
   * @param where User selector
   * @param newPassword New password to be used
   * @returns User
   * @throws UserNotFound if user is not found
   */
  async updatePasswordUnckecked(where: Prisma.UserWhereUniqueInput, newPassword: string) {
    const password = await bcrypt.hash(newPassword, 10);

    try {
      return this.prisma.user.update({
        where,
        data: {
          password,
        },
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
