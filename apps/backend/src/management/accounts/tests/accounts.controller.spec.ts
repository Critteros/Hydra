import { INestApplication, HttpStatus } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { AuthModule } from '@/auth/auth.module';
import { PrismaService } from '@/db/prisma.service';
import { prismaTruncateDB, createMockDB, type StartedPostgreSqlContainer } from '@/utils/test';
import ms from 'ms';
import request from 'supertest';

import { AccountsController } from '../accounts.controller';

describe('Test management AccountsController', () => {
  jest.setTimeout(ms('30s'));

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
      imports: [AuthModule],
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

  describe('GET /accounts/create-admin-account', () => {
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
  });

  describe('GET /accounts/create-standard-account', () => {
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
  });
});
