import { HttpStatus } from '@nestjs/common';

import { gql } from 'graphql-tag';
import request from 'supertest-graphql';

import { IntegrationTestManager } from '@/utils/test';

describe('Test UserResolver', () => {
  const manager = new IntegrationTestManager();

  beforeAll(async () => {
    await manager.beforeAll();
  });

  afterAll(async () => {
    await manager.afterAll();
  });

  beforeEach(async () => {
    await manager.beforeEach();
  });

  afterEach(async () => {
    await manager.afterEach();
  });

  it('requires authentication', async () => {
    const query = gql`
      query {
        me {
          uid
        }
      }
    `;
    const { data, errors } = await request(manager.httpServer).path('/api/graphql').query(query);
    expect(data).toBeNull();
    expect(errors).toHaveLength(1);
    expect((errors![0] as any).code).toBe(HttpStatus.FORBIDDEN);
  });

  it('resolves to logged in user', async () => {
    const user = manager.adminUser;
    const cookie = await manager.login(user);

    const query = gql`
      query {
        me {
          uid
        }
      }
    `;

    await request(manager.httpServer)
      .path('/api/graphql')
      .set('Cookie', cookie)
      .query(query)
      .expectNoErrors();
  });
});
