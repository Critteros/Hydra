import { HttpStatus, Module } from '@nestjs/common';

import { faker } from '@faker-js/faker';

import { PrismaService } from '@/database/prisma.service';
import { ErrorsModule } from '@/errors/errors.module';
import { UserModule } from '@/user/user.module';
import { E2ETestManager } from '@/utils/testing/e2e-test-manager';

import { AccountsController } from '../accounts.controller';

@Module({
  controllers: [AccountsController],
  imports: [UserModule, ErrorsModule],
})
class TestModule {}

describe('Test management AccountsController', () => {
  let prisma: PrismaService;

  const manager = new E2ETestManager(TestModule);

  manager.installHooks();

  beforeEach(() => {
    prisma = manager.app.get(PrismaService);
  });

  describe('POST /api/accounts/create-admin-account', () => {
    const url = '/api/accounts/create-admin-account';

    it('should return 200 and create account', async () => {
      await expect(prisma.user.count()).resolves.toBe(0);
      await manager.req
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
      return manager.req.post(url).expect(HttpStatus.BAD_REQUEST).send({
        email: 'malformed email',
        password: 'testpass',
      });
    });

    it('should return 400 if password is omitted', () => {
      return manager.req.post(url).expect(HttpStatus.BAD_REQUEST).send({
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

      await manager.req
        .post(url)
        .expect(HttpStatus.CONFLICT)
        .send({ email: user.email, password: faker.internet.password() });
    });
  });

  describe('POST /api/accounts/create-standard-account', () => {
    const url = '/api/accounts/create-standard-account';

    it('should return 200 and create account', async () => {
      await expect(prisma.user.count()).resolves.toBe(0);
      await manager.req
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

      await manager.req
        .post(url)
        .expect(HttpStatus.CONFLICT)
        .send({ email: user.email, password: faker.internet.password() });
    });
  });
});
