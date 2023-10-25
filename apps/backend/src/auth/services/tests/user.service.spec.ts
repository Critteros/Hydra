import { Test } from '@nestjs/testing';

import { PrismaService } from '@/db/prisma.service';
import { createMockDB, type StartedPostgreSqlContainer, prismaTruncateDB } from '@/utils/test';
import { faker } from '@faker-js/faker';
import type { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import { UserService, UserAlreadyExistsError, UserNotFound } from '../user.service';

jest.mock('bcrypt');

describe('Test UserService', () => {
  let postgresqlContainer: StartedPostgreSqlContainer;
  let userService: UserService;
  let prisma: PrismaService;

  beforeAll(async () => {
    const { container } = await createMockDB();
    postgresqlContainer = container;
  });

  afterAll(async () => {
    await postgresqlContainer.stop();
  });

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [UserService, PrismaService],
    }).compile();

    userService = moduleRef.get<UserService>(UserService);
    prisma = moduleRef.get<PrismaService>(PrismaService);
  });

  afterEach(async () => {
    await prismaTruncateDB(prisma);
    await prisma.$disconnect();
  });

  describe('Finds user', () => {
    let user: User;

    beforeEach(async () => {
      user = await prisma.user.create({
        data: {
          email: 'sample email',
          password: 'sample password',
          accountType: 'ADMIN',
        },
      });
    });

    it('finds user by uid', async () => {
      const foundUser = await userService.find({
        uid: user.uid,
      });
      expect(foundUser).toEqual(user);
    });

    it('finds user by email', async () => {
      const foundUser = await userService.find({
        email: user.email,
      });
      expect(foundUser).toEqual(user);
    });
  });

  it('creates user without hashing', async () => {
    const user = await userService.createUser(
      {
        email: 'sample email',
        password: 'sample password',
      },
      false,
    );
    expect(user).toBeDefined();

    const foundUser = await prisma.user.findUnique({
      where: {
        uid: user.uid,
      },
    });

    expect(foundUser).toBeDefined();
    expect(foundUser).toEqual(user);
    expect(foundUser?.password).toEqual('sample password');
    expect(foundUser?.accountType).toEqual('STANDARD');
    expect(foundUser?.email).toEqual('sample email');
  });

  it('creates user with hashing', async () => {
    (bcrypt.hash as jest.Mock).mockImplementation(async (password: string) => `hashed ${password}`);
    const user = await userService.createUser({
      email: 'sample email',
      password: 'sample password',
    });
    expect(user).toBeDefined();

    expect(bcrypt.hash).toHaveBeenCalledWith('sample password', expect.any(Number));
    expect(bcrypt.hash).toHaveBeenCalledTimes(1);

    expect(user.password).toEqual('hashed sample password');
  });

  it('updates user', async () => {
    const user = await prisma.user.create({
      data: {
        email: 'sample email',
        password: 'sample password',
      },
    });
    await userService.updateUser({
      where: {
        uid: user.uid,
      },
      data: {
        email: 'updated email',
      },
    });
    const updatedUser = await prisma.user.findUnique({
      where: {
        uid: user.uid,
      },
    });

    expect(updatedUser?.email).toEqual('updated email');
  });

  it('deletes user', async () => {
    const user = await prisma.user.create({
      data: {
        email: 'sample email',
        password: 'sample password',
      },
    });

    await userService.deleteUser({
      uid: user.uid,
    });

    const deletedUser = await prisma.user.findUnique({
      where: {
        uid: user.uid,
      },
    });

    expect(deletedUser).toBeNull();
  });

  it('fails when user with the same email already exists', async () => {
    const user = await prisma.user.create({
      data: {
        email: faker.internet.email(),
        password: faker.internet.password(),
      },
    });

    const exec = () => {
      return userService.createUser(
        {
          email: user.email,
          password: faker.internet.password(),
        },
        false,
      );
    };

    await expect(exec).rejects.toThrowError(UserAlreadyExistsError);
  });

  it('fails to update user that does not exists', async () => {
    const exec = () => {
      return userService.updateUser({
        where: {
          uid: faker.string.uuid(),
        },
        data: {
          email: faker.internet.email(),
        },
      });
    };

    await expect(exec).rejects.toThrowError(UserNotFound);
  });

  it('fails to delete user that does not exists', async () => {
    const exec = () => {
      return userService.deleteUser({
        uid: faker.string.uuid(),
      });
    };

    await expect(exec).rejects.toThrowError(UserNotFound);
  });
});
