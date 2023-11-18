import { HttpStatus, Module } from '@nestjs/common';

import { AccountType } from '@prisma/client';
import { gql } from 'graphql-tag';

import { PrismaService } from '@/database/prisma.service';
import { UserModule } from '@/user/user.module';
import { E2ETestManager } from '@/utils/testing/e2e-test-manager';
import { userFactory } from '@/utils/testing/factories';

@Module({
  imports: [UserModule],
})
class TestModule {}

describe('Test UserResolver', () => {
  let prismaService: PrismaService;
  const manager = new E2ETestManager(TestModule);

  manager.installHooks();

  beforeEach(() => {
    prismaService = manager.app.get(PrismaService);
  });

  it('requires authentication', async () => {
    const query = gql`
      query {
        me {
          uid
        }
      }
    `;
    const { data, errors } = await manager.gql.query(query);
    expect(data).toBeNull();
    expect(errors).toHaveLength(1);
    expect((errors![0] as any).code).toBe(HttpStatus.UNAUTHORIZED);
  });

  it('resolves to logged in user', async () => {
    const user = await userFactory(prismaService, { accountType: AccountType.ADMIN });
    await manager.login(user);

    const query = gql`
      query {
        me {
          uid
        }
      }
    `;

    const { data } = await manager.gql.query(query).expectNoErrors();
    expect(data).toMatchObject({
      me: {
        uid: user.uid,
      },
    });
  });
});
