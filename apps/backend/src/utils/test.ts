import { exec } from 'node:child_process';
import { promisify } from 'node:util';

import { PostgreSqlContainer } from '@testcontainers/postgresql';
import { GenericContainer, Wait } from 'testcontainers';

import type { PrismaService } from '@/db/prisma.service';

const execAsync = promisify(exec);

export async function createMockDB(params?: { upsertEnv?: boolean }) {
  const { upsertEnv = true } = params ?? {};

  const postgresqlContainer = await new PostgreSqlContainer('postgres:16').start();
  const DATABASE_URL = postgresqlContainer.getConnectionUri();
  const env = {
    ...process.env,
    DATABASE_URL,
  };
  await execAsync('npx prisma db push --skip-generate', { env });
  if (upsertEnv) {
    process.env = env;
  }

  return {
    container: postgresqlContainer,
    DATABASE_URL,
  };
}

export async function createMockRedis(params?: { upsertEnv?: boolean }) {
  const { upsertEnv = true } = params ?? {};

  const redisContainer = await new GenericContainer('redis:7')
    .withExposedPorts(6379)
    .withWaitStrategy(Wait.forLogMessage('Ready to accept connections'))
    .start();
  const REDIS_URL = `redis://${redisContainer.getHost()}:${redisContainer.getMappedPort(6379)}`;
  const env = {
    ...process.env,
    REDIS_URL,
  };
  if (upsertEnv) {
    process.env = env;
  }

  return {
    container: redisContainer,
    REDIS_URL,
  };
}

export async function prismaTruncateDB(prisma: PrismaService) {
  await prisma.__unsafe__truncate();
  await prisma.__unsafe__resetSequences();
}

export type { StartedPostgreSqlContainer } from '@testcontainers/postgresql';
