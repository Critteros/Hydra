import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import type { Config } from '@hydra-ipxe/common/server/config';
import RedisStore from 'connect-redis';
import session from 'express-session';
import passport from 'passport';
import { createClient } from 'redis';

import { version } from '../package.json';

import { AppModule } from './app.module';

const redisClient = createClient();
const redisStore = new RedisStore({ client: redisClient, prefix: 'hydra-ipxe:' });

async function setupApi() {
  const logger = new Logger('setupApi');
  logger.log('Setting up API server');
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  await redisClient.connect();
  app.use(
    session({
      store: redisStore,
      secret: process.env.COOKIE_SECRET ?? 'hydra-ipxe',
      cookie: { secure: false },
      resave: false,
      saveUninitialized: false,
      name: 'session',
    }),
  );
  app.use(passport.session());

  const openApiConfig = new DocumentBuilder()
    .setTitle('Hydra iPXE REST API')
    .setDescription('The Hydra iPXE REST API description')
    .setVersion(version)
    .build();
  const document = SwaggerModule.createDocument(app, openApiConfig);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(8000);
  logger.log('API server listening on port 8000');
  return app;
}

async function setupManagementApi(socketPath: string) {
  const logger = new Logger('setupManagementApi');
  logger.log(`Setting up management API on socket ${socketPath}`);

  const { ManagementModule } = await import('./management/management.module');
  const { UnixSocket } = await import('@hydra-ipxe/common/server/utils/fs');
  const { path } = await new UnixSocket(socketPath).obtain();
  const app = await NestFactory.create(ManagementModule);

  await app.listen(path);
  logger.log(`Management API is listening on ${path}`);
  return app;
}

async function bootstrap() {
  const apiApp = await setupApi();
  const { enable: socketEnabled, path: socketPath } = apiApp
    .get<ConfigService<Config>>(ConfigService)
    .get<Config['socket']>('socket')!;

  if (socketEnabled) {
    await setupManagementApi(socketPath);
  }
}
void bootstrap();
