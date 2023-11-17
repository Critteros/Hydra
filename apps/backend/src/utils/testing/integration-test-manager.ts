import { PrismaClient } from '@prisma/client';

import { PostgreSQLTestDB } from './containers/postgresql';

export class IntegrationTestManager {
  private testDbContainer: PostgreSQLTestDB;
  private client!: PrismaClient;

  constructor() {
    this.testDbContainer = new PostgreSQLTestDB();
  }

  installHooks() {
    beforeAll(async () => {
      await this.testDbContainer.setup();
      process.env.DATABASE_URL = this.testDbContainer.connectionUri;
      this.client = new PrismaClient();
    });

    afterAll(async () => {
      await this.testDbContainer.teardown();
      await this.client.$disconnect();
    });

    afterEach(async () => {
      await this.testDbContainer.reset(this.client);
    });
  }
}
