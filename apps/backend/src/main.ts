import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import type { Config } from '@hydra-ipxe/common/server/config';

import { AppModule } from './app.module';

async function setupApi() {
  const logger = new Logger('setupApi');
  logger.log('Setting up API server');
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
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
