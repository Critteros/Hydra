import { exec } from 'node:child_process';
import { promisify } from 'node:util';

import type { PrismaClient } from '@prisma/client';
import { PostgreSqlContainer, type StartedPostgreSqlContainer } from '@testcontainers/postgresql';

const execAsync = promisify(exec);

async function createDBSchema(env: Record<string, string>) {
  await execAsync('npx prisma db push --skip-generate', { env });
}

async function seedDB(env: Record<string, string>) {
  await execAsync('npx prisma db seed', { env });
}

async function truncateTable(client: PrismaClient, tablename: string) {
  await client.$executeRawUnsafe(`TRUNCATE TABLE "public"."${tablename}" CASCADE;`);
}

export class PostgreSQLTestDB {
  private readonly container: PostgreSqlContainer;
  private startedContainer: StartedPostgreSqlContainer | undefined;

  constructor() {
    this.container = new PostgreSqlContainer('postgres:16');
  }

  async setup({ createSchema = true, seed = true }: { createSchema?: boolean; seed?: boolean }) {
    const perfCounter = 
    this.startedContainer = await this.container.start();
    const DATABASE_URL = this.startedContainer.getConnectionUri();
    const env = {
      ...process.env,
      DATABASE_URL,
    };
    if (createSchema) {
      await createDBSchema(env);
    }
    if (seed) {
      await seedDB(env);
    }
  }

  async static truncateDB(prisma: PrismaClient) {

  }

  get connectionUri() {
    if (!this.startedContainer) {
      throw new Error('Container not started');
    }
    return this.startedContainer.getConnectionUri();
  }
}
