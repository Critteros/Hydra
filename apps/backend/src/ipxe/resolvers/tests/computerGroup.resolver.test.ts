import { Module, HttpStatus } from '@nestjs/common';

import { AccountType, User } from '@prisma/client';
import { gql } from 'graphql-tag';

import { PrismaService } from '@/database/prisma.service';
import { IpxeModule } from '@/ipxe/ipxe.module';
import { E2ETestManager } from '@/utils/testing/e2e-test-manager';
import { userFactory } from '@/utils/testing/factories';

@Module({
  imports: [IpxeModule],
})
class TestModule {}

describe('Test ComputerGroupResolver', () => {
  let prismaService: PrismaService;

  const manager = new E2ETestManager(TestModule);

  manager.installHooks();

  beforeEach(() => {
    prismaService = manager.moduleRef.get(PrismaService);
  });

  it('requries authentication', async () => {
    const query = gql`
      query {
        computerGroups {
          uid
        }
      }
    `;

    const { data, errors } = await manager.gql.query(query);
    expect(data).toBeNull();
    expect(errors?.[0]?.extensions?.originalError?.statusCode).toBe(HttpStatus.UNAUTHORIZED);
  });

  describe('queries', () => {
    let user: User;

    beforeEach(async () => {
      user = await userFactory(manager.moduleRef, { accountType: AccountType.STANDARD }, [
        'computers.read',
      ]);
    });

    it('does not allows reads without computers.read permission', async () => {
      const user = await userFactory(manager.moduleRef, { accountType: AccountType.STANDARD });
      await manager.login(user);

      const query = gql`
        query {
          computerGroups {
            uid
          }
        }
      `;

      const { data, errors } = await manager.gql.query(query);
      expect(data).toBeNull();
      expect(errors?.[0]?.extensions?.originalError?.statusCode).toBe(HttpStatus.FORBIDDEN);
    });

    it('reads all computer groups using computerGroups query', async () => {
      await manager.login(user);
      const data = await Promise.all([
        prismaService.computerGroup.create({
          data: {
            name: 'test-group-1',
          },
        }),
        prismaService.computerGroup.create({
          data: {
            name: 'test-group-2',
          },
        }),
      ]);

      const query = gql`
        query {
          computerGroups {
            uid
            name
          }
        }
      `;

      const { data: resultData } = await manager.gql.query(query).expectNoErrors();
      expect(resultData).toMatchObject({
        computerGroups: expect.arrayContaining([
          expect.objectContaining({
            uid: data[0].uid,
            name: 'test-group-1',
          }),
          expect.objectContaining({
            uid: data[1].uid,
            name: 'test-group-2',
          }),
        ]),
      });
    });

    it('reads a single computer group using computerGroup query', async () => {
      await manager.login(user);
      const data = await prismaService.computerGroup.create({
        data: {
          name: 'test-group-1',
        },
      });

      const query = gql`
        query ($where: WhereUniqueComputerGroupInput!) {
          computerGroup(where: $where) {
            uid
            name
          }
        }
      `;

      const { data: resultData } = await manager.gql
        .query(query, {
          where: {
            uid: data.uid,
          },
        })
        .expectNoErrors();
      expect(resultData).toMatchObject({
        computerGroup: expect.objectContaining({
          uid: data.uid,
          name: 'test-group-1',
        }),
      });
    });

    it('returns null when computer group is not found', async () => {
      await manager.login(user);

      const query = gql`
        query ($where: WhereUniqueComputerGroupInput!) {
          computerGroup(where: $where) {
            uid
            name
          }
        }
      `;

      const { data } = await manager.gql
        .query(query, {
          where: {
            uid: 'not-found',
          },
        })
        .expectNoErrors();
      expect(data).toMatchObject({
        computerGroup: null,
      });
    });

    it('can query computerGroup computers', async () => {
      await manager.login(user);

      const group = await prismaService.computerGroup.create({
        data: {
          name: 'test-group-1',
          viewOptions: {
            create: {
              order: 2,
            },
          },
          computers: {
            create: [
              {
                name: 'computer-1',
                mac: '00:00:00:00:00:00',
              },
              {
                name: 'computer-2',
                mac: '00:00:00:00:00:01',
              },
            ],
          },
        },
      });

      const query = gql`
        query ($where: WhereUniqueComputerGroupInput!) {
          computerGroup(where: $where) {
            uid
            name
            computers {
              name
              mac
            }
            viewOptions {
              order
            }
          }
        }
      `;

      const { data } = await manager.gql
        .query(query, { where: { uid: group.uid } })
        .expectNoErrors();
      expect(data).toMatchObject({
        computerGroup: {
          uid: group.uid,
          name: 'test-group-1',
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
          viewOptions: {
            order: 2,
          },
        },
      });
    });
  });

  describe('mutations', () => {
    let user: User;

    beforeEach(async () => {
      user = await userFactory(manager.moduleRef, { accountType: AccountType.STANDARD }, [
        'computers.create',
        'computers.edit',
        'computers.delete',
      ]);
    });

    it('does not allow creation without computers.create permission', async () => {
      const user = await userFactory(manager.moduleRef, { accountType: AccountType.STANDARD });
      await manager.login(user);

      const mutation = gql`
        mutation {
          createComputerGroup(
            data: { name: "test-group-1", computers: [], viewOptions: { order: 1 } }
          ) {
            uid
          }
        }
      `;

      const { data, errors } = await manager.gql.mutate(mutation);
      expect(data).toBeNull();
      expect(errors?.[0]?.extensions?.originalError?.statusCode).toBe(HttpStatus.FORBIDDEN);
    });

    it('can perform createComputerGroup mutation', async () => {
      await manager.login(user);

      const mutation = gql`
        mutation {
          createComputerGroup(
            data: { name: "test-group-1", computers: [], viewOptions: { order: 1 } }
          ) {
            uid
            name
            viewOptions {
              order
            }
          }
        }
      `;

      const { data } = await manager.gql.mutate(mutation).expectNoErrors();
      expect(data).toMatchObject({
        createComputerGroup: {
          uid: expect.any(String),
          name: 'test-group-1',
          viewOptions: {
            order: 1,
          },
        },
      });
    });

    it('can createComputerGroup mutation and link computers', async () => {
      await manager.login(user);

      const computers = await Promise.all([
        prismaService.computer.create({
          data: {
            name: 'computer-1',
            mac: '00:00:00:00:00:00',
          },
        }),
        prismaService.computer.create({
          data: {
            name: 'computer-2',
            mac: '00:00:00:00:00:01',
          },
        }),
      ]);

      const mutation = gql`
        mutation ($computers: [WhereUniqueComputerInput!]) {
          createComputerGroup(
            data: { name: "test-group-1", computers: $computers, viewOptions: { order: 1 } }
          ) {
            uid
            name
            computers {
              name
              mac
            }
            viewOptions {
              order
            }
          }
        }
      `;

      const { data } = await manager.gql
        .mutate(mutation, {
          computers: computers.map((computer) => ({ uid: computer.uid })),
        })
        .expectNoErrors();

      expect(data).toMatchObject({
        createComputerGroup: {
          uid: expect.any(String),
          name: 'test-group-1',
          computers: expect.arrayContaining([
            {
              name: 'computer-1',
              mac: '00:00:00:00:00:00',
            },
            {
              name: 'computer-2',
              mac: '00:00:00:00:00:01',
            },
          ]),
          viewOptions: {
            order: 1,
          },
        },
      });
    });

    it('requires computers.edit permissions for edit operations', async () => {
      const user = await userFactory(manager.moduleRef, { accountType: AccountType.STANDARD });
      await manager.login(user);

      const { name } = await prismaService.computerGroup.create({
        data: {
          name: 'test-group-1',
        },
      });

      const mutation = gql`
        mutation (
          $where: WhereUniqueComputerGroupInput!
          $data: ComputerGroupViewOptionsUpdateInput!
        ) {
          changeComputerGroupViewOptions(where: $where, data: $data) {
            order
          }
        }
      `;

      const { data, errors } = await manager.gql.mutate(mutation, {
        where: {
          name,
        },
        data: {
          order: 1,
        },
      });
      expect(data).toBeNull();
      expect(errors?.[0]?.extensions?.originalError?.statusCode).toBe(HttpStatus.FORBIDDEN);
    });

    it('can edit viewOptions of a computer group', async () => {
      await manager.login(user);

      const group = await prismaService.computerGroup.create({
        data: {
          name: 'test-group-1',
          viewOptions: {
            create: {
              order: 2,
            },
          },
        },
      });

      const mutation = gql`
        mutation (
          $where: WhereUniqueComputerGroupInput!
          $data: ComputerGroupViewOptionsUpdateInput!
        ) {
          changeComputerGroupViewOptions(where: $where, data: $data) {
            order
          }
        }
      `;

      const { data } = await manager.gql
        .mutate(mutation, {
          where: {
            uid: group.uid,
          },
          data: {
            order: 1,
          },
        })
        .expectNoErrors();

      expect(data).toMatchObject({
        changeComputerGroupViewOptions: {
          order: 1,
        },
      });

      const updatedGroup = await prismaService.computerGroup.findUnique({
        where: {
          uid: group.uid,
        },
        include: {
          viewOptions: true,
        },
      });
      expect(updatedGroup).toMatchObject({
        viewOptions: {
          order: 1,
        },
      });
    });

    it('can add computers to a computer group', async () => {
      await manager.login(user);

      const group = await prismaService.computerGroup.create({
        data: {
          name: 'test-group-1',
        },
      });

      const computers = await Promise.all([
        prismaService.computer.create({
          data: {
            name: 'computer-1',
            mac: '00:00:00:00:00:00',
          },
        }),
        prismaService.computer.create({
          data: {
            name: 'computer-2',
            mac: '00:00:00:00:00:01',
          },
        }),
      ]);

      const mutation = gql`
        mutation (
          $where: WhereUniqueComputerGroupInput!
          $computers: [WhereUniqueComputerInput!]!
        ) {
          addComputersToGroup(where: $where, computers: $computers) {
            computers {
              name
              mac
            }
          }
        }
      `;

      const { data } = await manager.gql
        .mutate(mutation, {
          where: {
            uid: group.uid,
          },
          computers: computers.map((computer) => ({ uid: computer.uid })),
        })
        .expectNoErrors();

      expect(data).toMatchObject({
        addComputersToGroup: {
          computers: expect.arrayContaining([
            expect.objectContaining({
              name: 'computer-1',
              mac: '00:00:00:00:00:00',
            }),
            expect.objectContaining({
              name: 'computer-2',
              mac: '00:00:00:00:00:01',
            }),
          ]),
        },
      });

      const computersInGroup = await prismaService.computer.findMany({
        where: {
          computerGroupId: group.uid,
        },
      });

      expect(computersInGroup).toHaveLength(2);
      expect(computersInGroup).toEqual([
        expect.objectContaining({
          name: 'computer-1',
          mac: '00:00:00:00:00:00',
        }),
        expect.objectContaining({
          name: 'computer-2',
          mac: '00:00:00:00:00:01',
        }),
      ]);
    });

    it('can remove computers from a computer group', async () => {
      await manager.login(user);

      const group = await prismaService.computerGroup.create({
        data: {
          name: 'test-group-1',
        },
      });

      const computers = await Promise.all([
        prismaService.computer.create({
          data: {
            name: 'computer-1',
            mac: '00:00:00:00:00:00',
            computerGroup: {
              connect: {
                uid: group.uid,
              },
            },
          },
        }),
        prismaService.computer.create({
          data: {
            name: 'computer-2',
            mac: '00:00:00:00:00:01',
            computerGroup: {
              connect: {
                uid: group.uid,
              },
            },
          },
        }),
      ]);

      const mutation = gql`
        mutation (
          $where: WhereUniqueComputerGroupInput!
          $computers: [WhereUniqueComputerInput!]!
        ) {
          removeComputersFromGroup(where: $where, computers: $computers) {
            computers {
              name
              mac
            }
          }
        }
      `;

      const { data } = await manager.gql
        .mutate(mutation, {
          where: {
            uid: group.uid,
          },
          computers: [{ name: computers[0].name }],
        })
        .expectNoErrors();

      expect(data).toMatchObject({
        removeComputersFromGroup: {
          computers: [
            {
              name: 'computer-2',
              mac: '00:00:00:00:00:01',
            },
          ],
        },
      });

      const computersInGroup = await prismaService.computer.findMany({
        where: {
          computerGroupId: group.uid,
        },
      });

      expect(computersInGroup).toHaveLength(1);
      expect(computersInGroup).toEqual([
        expect.objectContaining({
          name: 'computer-2',
          mac: '00:00:00:00:00:01',
        }),
      ]);
    });

    it('can move computers from one group to another', async () => {
      await manager.login(user);

      const groups = await Promise.all([
        prismaService.computerGroup.create({
          data: {
            name: 'test-group-1',
          },
        }),
        prismaService.computerGroup.create({
          data: {
            name: 'test-group-2',
          },
        }),
      ]);

      const computers = await Promise.all([
        prismaService.computer.create({
          data: {
            name: 'computer-1',
            mac: '00:00:00:00:00:00',
            computerGroup: {
              connect: {
                uid: groups[0].uid,
              },
            },
          },
        }),
        prismaService.computer.create({
          data: {
            name: 'computer-2',
            mac: '00:00:00:00:00:01',
            computerGroup: {
              connect: {
                uid: groups[0].uid,
              },
            },
          },
        }),
      ]);

      const mutation = gql`
        mutation (
          $fromGroup: WhereUniqueComputerGroupInput!
          $toGroup: WhereUniqueComputerGroupInput!
          $computers: [WhereUniqueComputerInput!]!
        ) {
          moveComputers(fromGroup: $fromGroup, toGroup: $toGroup, computers: $computers) {
            name
            mac
          }
        }
      `;

      const { data } = await manager.gql
        .mutate(mutation, {
          fromGroup: {
            uid: groups[0].uid,
          },
          toGroup: {
            uid: groups[1].uid,
          },
          computers: [{ name: computers[0].name }],
        })
        .expectNoErrors();

      expect(data).toMatchObject({
        moveComputers: expect.arrayContaining([
          expect.objectContaining({
            name: 'computer-1',
            mac: '00:00:00:00:00:00',
          }),
        ]),
      });

      const computersInGroup1 = await prismaService.computer.findMany({
        where: {
          computerGroupId: groups[0].uid,
        },
      });

      expect(computersInGroup1).toHaveLength(1);
      expect(computersInGroup1).toEqual([
        expect.objectContaining({
          name: 'computer-2',
          mac: '00:00:00:00:00:01',
        }),
      ]);

      const computersInGroup2 = await prismaService.computer.findMany({
        where: {
          computerGroupId: groups[1].uid,
        },
      });

      expect(computersInGroup2).toHaveLength(1);
      expect(computersInGroup2).toEqual([
        expect.objectContaining({
          name: 'computer-1',
          mac: '00:00:00:00:00:00',
        }),
      ]);
    });

    it('cannot delete computer group withotu computers.delete permission', async () => {
      const user = await userFactory(manager.moduleRef, { accountType: AccountType.STANDARD });
      await manager.login(user);

      const group = await prismaService.computerGroup.create({
        data: {
          name: 'test-group-1',
        },
      });

      const mutation = gql`
        mutation ($where: WhereUniqueComputerGroupInput!) {
          deleteComputerGroup(where: $where) {
            uid
          }
        }
      `;

      const { data, errors } = await manager.gql.mutate(mutation, {
        where: {
          uid: group.uid,
        },
      });
      expect(data).toBeNull();
      expect(errors?.[0]?.extensions?.originalError?.statusCode).toBe(HttpStatus.FORBIDDEN);
    });

    it('can delete computer group', async () => {
      await manager.login(user);

      const group = await prismaService.computerGroup.create({
        data: {
          name: 'test-group-1',
        },
      });

      const mutation = gql`
        mutation ($where: WhereUniqueComputerGroupInput!) {
          deleteComputerGroup(where: $where) {
            uid
          }
        }
      `;

      const { data } = await manager.gql
        .mutate(mutation, {
          where: {
            uid: group.uid,
          },
        })
        .expectNoErrors();

      expect(data).toMatchObject({
        deleteComputerGroup: {
          uid: group.uid,
        },
      });

      const deletedGroup = await prismaService.computerGroup.findUnique({
        where: {
          uid: group.uid,
        },
      });
      expect(deletedGroup).toBeNull();
    });
  });
});
