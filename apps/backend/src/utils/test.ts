import { exec } from 'node:child_process';
import { promisify } from 'node:util';

import { type INestApplication, HttpStatus, Injectable, type NestMiddleware } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { faker } from '@faker-js/faker';
import type { User as PrismaUser } from '@prisma/client';
import { PostgreSqlContainer, type StartedPostgreSqlContainer } from '@testcontainers/postgresql';
import cookie from 'cookie';
import type { Request, Response, NextFunction, Express } from 'express';
import session from 'express-session';
import request from 'supertest';
import { GenericContainer, Wait, type StartedTestContainer } from 'testcontainers';

import { PrismaService } from '@/database/prisma.service';
import { RedisOptionsToken } from '@/redis/redis.constants';
import type { RedisOptions } from '@/redis/redis.module';
import { UserService } from '@/user/services/user.service';

import { AppModule } from '../app.module';

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

export class IntegrationTestManager {
  private app!: INestApplication<Express>;

  private containers!: {
    db: StartedPostgreSqlContainer;
    redis: StartedTestContainer;
  };

  private containerConfig!: {
    DATABASE_URL: string;
    REDIS_URL: string;
  };

  public httpServer!: Express;

  public prisma!: PrismaService;
  public userService!: UserService;

  public adminUser!: PrismaUser;
  public standardUser!: PrismaUser;

  async beforeAll() {
    const [{ container: dbContainer, DATABASE_URL }, { container: redisContainer, REDIS_URL }] =
      await Promise.all([createMockDB(), createMockRedis()]);
    this.containers = {
      db: dbContainer,
      redis: redisContainer,
    };
    this.containerConfig = {
      DATABASE_URL,
      REDIS_URL,
    };
  }

  async afterAll() {
    await Promise.all([this.containers.db.stop(), this.containers.redis.stop()]);
  }

  async beforeEach() {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(RedisOptionsToken)
      .useValue({ url: this.containerConfig.REDIS_URL } as RedisOptions)
      .compile();

    this.app = moduleRef.createNestApplication();
    this.app.setGlobalPrefix('api');
    this.prisma = moduleRef.get(PrismaService);
    this.userService = moduleRef.get(UserService);

    await this.app.init();
    this.httpServer = this.app.getHttpServer();

    const [adminUser, standardUser] = await Promise.all([
      this.userService.createUser({
        email: faker.internet.email(),
        password: 'password',
        accountType: 'ADMIN',
      }),
      this.userService.createUser({
        email: faker.internet.email(),
        password: 'password',
        accountType: 'STANDARD',
      }),
    ]);

    this.adminUser = adminUser;
    this.standardUser = standardUser;
  }

  async afterEach() {
    const jobs = [
      async () => {
        await prismaTruncateDB(this.prisma);
        await this.prisma.$disconnect();
      },
      () => this.app.close(),
    ];
    await Promise.all(jobs.map((job) => job()));
  }

  async login(user: PrismaUser) {
    const res = await request(this.httpServer)
      .post('/api/auth/login')
      .send({
        email: user.email,
        password: 'password',
      })
      .expect(HttpStatus.OK);
    const headers = res.headers as Record<string, unknown>;
    const sessionCookie = cookie.parse((headers['set-cookie'] as string[])[0] as string)
      .session as string;

    return `session=${sessionCookie}`;
  }
}

@Injectable()
export class TestSessionMiddleware implements NestMiddleware {
  private sessionOptions: session.SessionOptions;
  constructor() {
    this.sessionOptions = {
      secret: 'hydra-ipxe',
      cookie: { secure: false },
      resave: false,
      saveUninitialized: false,
      name: 'session',
    };
  }
  use(req: Request, res: Response, next: NextFunction) {
    session(this.sessionOptions)(req, res, next);
  }
}

export type { StartedPostgreSqlContainer } from '@testcontainers/postgresql';
export type { StartedTestContainer } from 'testcontainers';
