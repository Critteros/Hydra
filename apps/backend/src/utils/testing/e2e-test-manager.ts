import { ApolloDriver } from '@nestjs/apollo';
import { MiddlewareConsumer, Module, type NestModule, type INestApplication } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { Test } from '@nestjs/testing';

import { PrismaClient } from '@prisma/client';
import type { User } from '@prisma/client';
import type { Express } from 'express';
import { GraphQLFormattedError } from 'graphql';
import { createClient, type RedisClientType } from 'redis';
import request from 'supertest';
import { SuperTestGraphQL } from 'supertest-graphql';
import type { Constructor } from 'type-fest';

import { AuthModule } from '@/auth/auth.module';
import { PassportMiddleware } from '@/middleware/passport.middleware';
import { SessionMiddleware } from '@/middleware/session.middleware';
import { RedisOptionsToken } from '@/redis/redis.constants';
import { RedisModule, RedisOptions } from '@/redis/redis.module';

import { PostgreSQLTestDB } from './containers/postgresql';
import { RedisTestCache } from './containers/redis';

@Module({
  imports: [
    AuthModule,
    RedisModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: true,
      path: '/api/graphql',
      formatError: (error: GraphQLFormattedError) => {
        const originalError = error.extensions?.originalError as
          | { message: string; error: string; statusCode: number }
          | undefined;

        if (!originalError) {
          return {
            message: error.message,
            code: error.extensions?.code,
            path: error.path,
          };
        }

        return {
          message: originalError.message,
          code: originalError.statusCode,
          path: error.path,
        };
      },
    }),
  ],
})
class BaseTestModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SessionMiddleware).forRoutes('*');
    consumer.apply(PassportMiddleware).forRoutes('*');
  }
}

export class E2ETestManager {
  private readonly testDbContainer: PostgreSQLTestDB;
  private readonly testRedisContainer: RedisTestCache;
  private dbClient!: PrismaClient;
  private redisClient!: RedisClientType;
  private _app!: INestApplication<Express>;
  private httpServer!: Express;
  private agent!: request.SuperAgentTest;

  constructor(private readonly testModule: Constructor<any>) {
    this.testDbContainer = new PostgreSQLTestDB();
    this.testRedisContainer = new RedisTestCache();
  }

  installHooks() {
    beforeAll(async () => {
      await Promise.all([this.testDbContainer.setup(), this.testRedisContainer.setup()]);
      process.env.DATABASE_URL = this.testDbContainer.connectionUri;
      process.env.REDIS_URL = this.testRedisContainer.connectionUri;
      this.dbClient = new PrismaClient();
      this.redisClient = createClient({
        url: this.testRedisContainer.connectionUri,
      });
      this.redisClient.on('error', (error) => {
        console.error(error);
      });
      await Promise.all([this.dbClient.$connect(), this.redisClient.connect()]);
    });

    afterAll(async () => {
      await Promise.all([this.dbClient.$disconnect(), this.redisClient.disconnect()]);
      await Promise.all([this.testDbContainer.teardown(), this.testRedisContainer.teardown()]);

      delete process.env.DATABASE_URL;
      delete process.env.REDIS_URL;
    });

    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        imports: [BaseTestModule, this.testModule],
      })
        .overrideProvider(RedisOptionsToken)
        .useValue({ url: this.testRedisContainer.connectionUri } as RedisOptions)
        .compile();

      this._app = moduleRef.createNestApplication();
      this._app.setGlobalPrefix('api');
      await this._app.init();
      this.httpServer = this._app.getHttpServer();
      this.agent = request.agent(this.httpServer);
    });

    afterEach(async () => {
      await this.app?.close();
      await Promise.all([
        this.testDbContainer.reset(this.dbClient),
        this.testRedisContainer.reset(this.redisClient),
      ]);
    });
  }

  get req() {
    return this.agent;
  }

  get gql() {
    return new SuperTestGraphQL(this.agent).path('/api/graphql');
  }

  get app() {
    return this._app;
  }

  async login({ email, password }: Pick<User, 'email' | 'password'>) {
    const response = await this.agent.post('/api/auth/login').send({ email, password });
    expect(response.status).toBe(200);
  }
}
