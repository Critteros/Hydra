import { exec } from 'node:child_process';
import { promisify } from 'node:util';

import type { PrismaClient } from '@prisma/client';
import { PostgreSqlContainer, type StartedPostgreSqlContainer } from '@testcontainers/postgresql';
import { debug } from 'debug';

import { PerfCounter } from '@/utils/perf-counter';
import type { PrismaCtx } from '@/utils/prisma/types';

const execAsync = promisify(exec);

async function createDBSchema(env: Record<string, string>) {
  await execAsync('npx prisma db push --skip-generate', { env });
}

async function seedDB(env: Record<string, string>) {
  await execAsync('npx prisma db seed', { env });
}

export async function truncateTable(client: PrismaCtx, tablename: string) {
  await client.$executeRawUnsafe(`TRUNCATE TABLE "public"."${tablename}" CASCADE;`);
}

export async function resetSequences(client: PrismaCtx) {
  const results = await client.$queryRawUnsafe<Array<{ record: { relname: string } }>>(
    `SELECT c.relname
     FROM pg_class AS c
              JOIN pg_namespace AS n ON c.relnamespace = n.oid
     WHERE c.relkind = 'S'
       AND n.nspname = 'public'`,
  );

  await Promise.all(
    results.map(({ record: { relname } }) =>
      client.$executeRawUnsafe(`ALTER SEQUENCE "public"."${relname}" RESTART WITH 1;`),
    ),
  );
}

export async function queryTables(client: PrismaCtx, schema = 'public') {
  const records = await client.$queryRawUnsafe<Array<{ tablename: string }>>(`
                                                        SELECT tablename
                                                        FROM pg_tables
                                                        WHERE schemaname = '${schema}'`);

  return records.map(({ tablename }) => tablename);
}

export class PostgreSQLTestDB {
  private readonly log = debug('test:containers:postgresql');
  private readonly container: PostgreSqlContainer;
  private startedContainer: StartedPostgreSqlContainer | undefined;

  constructor() {
    this.container = new PostgreSqlContainer('postgres:16-alpine').withTmpFs({
      '/var/lib/postgresql/data': 'rw,noexec,nosuid,size=100m',
    });
  }

  async setup({
    createSchema = true,
    seed = true,
  }: { createSchema?: boolean; seed?: boolean } = {}) {
    const perfCounter = new PerfCounter();
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
    const timeTaken = perfCounter.stop();
    this.log(`Setup took ${timeTaken.to('ms')}ms`);
  }

  async reset(client: PrismaClient) {
    const perfCounter = new PerfCounter();
    await client.$transaction(async (prisma) => {
      const tables = await queryTables(prisma);
      await Promise.all(tables.map((table) => truncateTable(prisma, table)));
      await resetSequences(prisma);
    });
    const timeTaken = perfCounter.stop();
    this.log(`Reset took ${timeTaken.to('ms')}ms`);
  }

  async teardown() {
    const perfCounter = new PerfCounter();
    if (this.startedContainer) {
      await this.startedContainer.stop();
    }
    const timeTaken = perfCounter.stop();
    this.log(`Teardown took ${timeTaken.to('ms')}ms`);
  }

  get connectionUri() {
    if (!this.startedContainer) {
      throw new Error('Container not started');
    }
    return this.startedContainer.getConnectionUri();
  }
}