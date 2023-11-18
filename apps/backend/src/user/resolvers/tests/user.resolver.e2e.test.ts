import { HttpStatus, Module } from '@nestjs/common';

import { AccountType } from '@prisma/client';
import { gql } from 'graphql-tag';

import { UserModule } from '@/user/user.module';
import { E2ETestManager } from '@/utils/testing/e2e-test-manager';
import { userFactory } from '@/utils/testing/factories';

@Module({
  imports: [UserModule],
})
class TestModule {}

describe('Test UserResolver', () => {
  const manager = new E2ETestManager(TestModule);

  manager.installHooks();

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
    expect(errors?.[0]?.extensions?.originalError?.statusCode).toBe(HttpStatus.UNAUTHORIZED);
  });

  it('resolves to logged in user', async () => {
    const user = await userFactory(manager.moduleRef, { accountType: AccountType.ADMIN });
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

  describe('Query users', () => {
    const query = gql`
      query {
        users {
          uid
          email
        }
      }
    `;

    it('does not resolve without "accounts.read" permissions', async () => {
      const user = await userFactory(manager.moduleRef, { accountType: AccountType.STANDARD });
      await manager.login(user);

      const { errors } = await manager.gql.query(query);
      expect(errors?.[0]?.extensions?.originalError?.statusCode).toBe(HttpStatus.FORBIDDEN);
    });

    it('resolve with "accounts.read" permissions', async () => {
      const user = await userFactory(manager.moduleRef, { accountType: AccountType.ADMIN }, [
        'accounts.read',
      ]);
      await manager.login(user);

      const { data } = await manager.gql.query(query).expectNoErrors();
      expect(data).toMatchObject({
        users: [
          {
            uid: user.uid,
            email: user.email,
          },
        ],
      });
    });
  });
});
