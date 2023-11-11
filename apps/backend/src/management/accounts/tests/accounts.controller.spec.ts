import { INestApplication, HttpStatus } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { faker } from '@faker-js/faker';
import request from 'supertest';

import { AuthModule } from '@/auth/auth.module';
import { PrismaService } from '@/database/prisma.service';
import { UserModule } from '@/user/user.module';
import { prismaTruncateDB, createMockDB, type StartedPostgreSqlContainer } from '@/utils/test';

import { AccountsController } from '../accounts.controller';

describe('Test management AccountsController', () => {
  let dbService: StartedPostgreSqlContainer;
  let prisma: PrismaService;
  let app: INestApplication;

  beforeAll(async () => {
    const { container } = await createMockDB();
    dbService = container;
  });

  afterAll(async () => {
    await dbService.stop();
  });

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AccountsController],
      imports: [AuthModule, UserModule],
    }).compile();
    prisma = moduleRef.get(PrismaService);
    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await prismaTruncateDB(prisma);
    await prisma.$disconnect();
    await app.close();
  });

  describe('POST /accounts/create-admin-account', () => {
    const url = '/accounts/create-admin-account';

    it('should return 200 and create account', async () => {
      await expect(prisma.user.count()).resolves.toBe(0);
      await request(app.getHttpServer())
        .post(url)
        .expect(HttpStatus.CREATED)
        .send({
          email: 'user@example.com',
          password: 'testpass',
        })
        .expect({
          message: 'success',
        });
      await expect(prisma.user.count()).resolves.toBe(1);
      await expect(prisma.user.findFirst()).resolves.toMatchObject({
        email: 'user@example.com',
        accountType: 'ADMIN',
        name: null,
      });
    });

    it('should return 400 if email is malformed', () => {
      return request(app.getHttpServer()).post(url).expect(HttpStatus.BAD_REQUEST).send({
        email: 'malformed email',
        password: 'testpass',
      });
    });

    it('should return 400 if password is omitted', () => {
      return request(app.getHttpServer()).post(url).expect(HttpStatus.BAD_REQUEST).send({
        email: 'user@example.com',
      });
    });

    it('should return 409 if email is already used', async () => {
      const user = await prisma.user.create({
        data: {
          email: faker.internet.email(),
          password: faker.internet.password(),
          accountType: 'ADMIN',
        },
      });

      await request(app.getHttpServer())
        .post(url)
        .expect(HttpStatus.CONFLICT)
        .send({ email: user.email, password: faker.internet.password() });
    });
  });

  describe('POST /accounts/create-standard-account', () => {
    const url = '/accounts/create-standard-account';

    it('should return 200 and create account', async () => {
      await expect(prisma.user.count()).resolves.toBe(0);
      await request(app.getHttpServer())
        .post(url)
        .expect(HttpStatus.CREATED)
        .send({
          email: 'user@example.com',
          password: 'testpass',
        })
        .expect({ message: 'success' });
      await expect(prisma.user.count()).resolves.toBe(1);
      await expect(prisma.user.findFirst()).resolves.toMatchObject({
        email: 'user@example.com',
        accountType: 'STANDARD',
        name: null,
      });
    });

    it('should return 409 if email is already used', async () => {
      const user = await prisma.user.create({
        data: {
          email: faker.internet.email(),
          password: faker.internet.password(),
          accountType: 'STANDARD',
        },
      });

      await request(app.getHttpServer())
        .post(url)
        .expect(HttpStatus.CONFLICT)
        .send({ email: user.email, password: faker.internet.password() });
    });
  });
});
