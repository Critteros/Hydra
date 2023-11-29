import { Module, HttpStatus } from '@nestjs/common';

import { AccountType, type User } from '@prisma/client';
import { gql } from 'graphql-tag';

import { PrismaService } from '@/database/prisma.service';
import { IpxeModule } from '@/ipxe/ipxe.module';
import { E2ETestManager } from '@/utils/testing/e2e-test-manager';
import { userFactory } from '@/utils/testing/factories';

@Module({
  imports: [IpxeModule],
})
class TestModule {}

describe('Test ComputerResolver', () => {
  let prismaService: PrismaService;

  const manager = new E2ETestManager(TestModule);

  manager.installHooks();

  beforeEach(() => {
    prismaService = manager.moduleRef.get(PrismaService);
  });

  it('requires authentication', async () => {
    const query = gql`
      query {
        computers {
          uid
        }
      }
    `;
    const { data, errors } = await manager.gql.query(query);
    expect(data).toBeNull();
    expect(errors?.[0]?.extensions?.originalError?.statusCode).toBe(HttpStatus.UNAUTHORIZED);
  });

  describe('test queries', () => {
    let user: User;

    beforeEach(async () => {
      user = await userFactory(manager.moduleRef, { accountType: AccountType.STANDARD }, [
        'computers.read',
      ]);

      await manager.login(user);
    });

    it('rejects with FORBIDDEN if user does not have coomputers.read permissions', async () => {
      const user = await userFactory(manager.moduleRef, { accountType: AccountType.STANDARD });
      await manager.login(user);

      const query = gql`
        query {
          computers {
            uid
          }
        }
      `;
      const { data, errors } = await manager.gql.query(query);
      expect(data).toBeNull();
      expect(errors?.[0]?.extensions?.originalError?.statusCode).toBe(HttpStatus.FORBIDDEN);
    });

    it('resolves to computer if user has computers.read permission', async () => {
      const user = await userFactory(manager.moduleRef, { accountType: AccountType.ADMIN }, [
        'computers.read',
      ]);

      await manager.login(user);

      const query = gql`
        query {
          computers {
            uid
            name
            mac
          }
        }
      `;

      const { data } = await manager.gql.query(query).expectNoErrors();
      expect(data).toMatchObject({
        computers: [],
      });
    });

    it('resolves multiple computers', async () => {
      await manager.login(user);

      await prismaService.computer.createMany({
        data: [
          {
            name: 'computer-1',
            mac: '00:00:00:00:00:00',
          },
          {
            name: 'computer-2',
            mac: '00:00:00:00:00:01',
          },
        ],
      });

      const query = gql`
        query {
          computers {
            name
            mac
          }
        }
      `;

      const { data } = await manager.gql.query(query).expectNoErrors();
      expect(data).toMatchObject({
        computers: [
          {
            name: 'computer-1',
            mac: '00:00:00:00:00:00',
          },
          {
            name: 'computer-2',
            mac: '00:00:00:00:00:01',
          },
        ],
      });
    });

    it('resolves a single computer', async () => {
      await manager.login(user);

      await prismaService.computer.create({
        data: {
          name: 'computer-1',
          mac: '00:00:00:00:00:00',
        },
      });

      const query = gql`
        query {
          computer(where: { name: "computer-1" }) {
            name
            mac
          }
        }
      `;

      const { data } = await manager.gql.query(query).expectNoErrors();
      expect(data).toMatchObject({
        computer: {
          name: 'computer-1',
          mac: '00:00:00:00:00:00',
        },
      });
    });

    it('reject with BAD_REQUEST if no selectors are passed to single computer query', async () => {
      await manager.login(user);

      const query = gql`
        query {
          computer(where: {}) {
            uid
            name
            mac
          }
        }
      `;

      const { data, errors } = await manager.gql.query(query);
      expect(data).toMatchObject({
        computer: null,
      });
      expect(errors?.[0]?.extensions?.originalError?.statusCode).toBe(HttpStatus.BAD_REQUEST);
    });

    it('can resolve computer alongiside view options', async () => {
      await manager.login(user);

      const computer = await prismaService.computer.create({
        data: {
          name: 'computer-1',
          mac: '00:00:00:00:00:00',
          viewOptions: {
            create: {
              order: 1,
            },
          },
        },
      });

      const query = gql`
        query {
          computer(where: { name: "computer-1" }) {
            uid
            name
            viewOptions {
              order
            }
          }
        }
      `;

      const { data } = await manager.gql.query(query).expectNoErrors();
      expect(data).toMatchObject({
        computer: {
          uid: computer.uid,
          name: 'computer-1',
          viewOptions: {
            order: 1,
          },
        },
      });
    });
  });

  describe('test mutations', () => {
    let user: User;

    beforeEach(async () => {
      user = await userFactory(manager.moduleRef, { accountType: AccountType.STANDARD }, [
        'computers.create',
        'computers.edit',
      ]);

      await manager.login(user);
    });

    it('rejects with FORBIDDEN if user does not have computers.create permissions', async () => {
      const user = await userFactory(manager.moduleRef, { accountType: AccountType.STANDARD });
      await manager.login(user);

      const mutation = gql`
        mutation {
          createComputer(
            data: {
              ipv4: "127.0.0.1"
              mac: "00:00:00:00:00:00"
              name: "computer-1"
              viewOptions: { order: 1 }
            }
          ) {
            ipv4
            mac
            name
            viewOptions {
              order
            }
          }
        }
      `;

      const { data, errors } = await manager.gql.mutate(mutation);
      expect(data).toBeNull();
      expect(errors?.[0]?.extensions?.originalError?.statusCode).toBe(HttpStatus.FORBIDDEN);
    });

    it('creates a computer', async () => {
      await manager.login(user);

      const mutation = gql`
        mutation {
          createComputer(
            data: {
              ipv4: "127.0.0.1"
              mac: "00:00:00:00:00:00"
              name: "computer-1"
              viewOptions: { order: 1 }
            }
          ) {
            ipv4
            mac
            name
            viewOptions {
              order
            }
          }
        }
      `;

      const { data } = await manager.gql.mutate(mutation).expectNoErrors();
      expect(data).toMatchObject({
        createComputer: {
          ipv4: '127.0.0.1',
          mac: '00:00:00:00:00:00',
          name: 'computer-1',
          viewOptions: { order: 1 },
        },
      });

      const computer = await prismaService.computer.findUnique({
        where: { name: 'computer-1' },
        include: { viewOptions: true },
      });
      expect(computer).toMatchObject({
        ipv4: '127.0.0.1',
        mac: '00:00:00:00:00:00',
        name: 'computer-1',
      });

      expect(computer?.viewOptions).toMatchObject({
        order: 1,
      });
    });

    it('creates view options when updating', async () => {
      await manager.login(user);

      await prismaService.computer.create({
        data: {
          name: 'computer-1',
          mac: '00:00:00:00:00:00',
          ipv4: '127.0.0.1',
        },
      });

      const mutation = gql`
        mutation {
          changeComputerViewOptions(where: { name: "computer-1" }, data: { order: 1 }) {
            order
          }
        }
      `;

      const { data } = await manager.gql.mutate(mutation).expectNoErrors();
      expect(data).toMatchObject({
        changeComputerViewOptions: {
          order: 1,
        },
      });

      const computer = await prismaService.computer.findUnique({
        where: { name: 'computer-1' },
        include: { viewOptions: true },
      });

      expect(computer?.viewOptions).toMatchObject({
        order: 1,
      });
    });

    it('updates view options when it already exists', async () => {
      await manager.login(user);

      const { uid } = await prismaService.computer.create({
        data: {
          name: 'computer-1',
          mac: '00:00:00:00:00:00',
          ipv4: '127.0.0.2',
          viewOptions: {
            create: {
              order: 2,
            },
          },
        },
      });

      await expect(
        prismaService.computerViewOptions.findUnique({ where: { computerId: uid } }),
      ).resolves.not.toBeNull();

      const mutation = gql`
        mutation {
          changeComputerViewOptions(where: { name: "computer-1" }, data: { order: 1 }) {
            order
          }
        }
      `;

      const { data } = await manager.gql.mutate(mutation).expectNoErrors();
      expect(data).toMatchObject({
        changeComputerViewOptions: {
          order: 1,
        },
      });

      const computer = await prismaService.computer.findUnique({
        where: { name: 'computer-1' },
        include: { viewOptions: true },
      });

      expect(computer?.viewOptions).toMatchObject({
        order: 1,
      });
    });
  });
});
