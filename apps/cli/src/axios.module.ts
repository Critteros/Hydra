import { access, constants } from 'node:fs/promises';

import { HttpModule } from '@nestjs/axios';
import { Module, Global, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import type { Config } from '@hydra-ipxe/common/server/config';
import chalk from 'chalk';

import { ConfigModule } from './config/config.module';

@Global()
@Module({
  imports: [
    ConfigModule,
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService<Config>) => ({
        socketPath: configService.get('socket.path', { infer: true }),
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [HttpModule],
})
export class AxiosModule implements OnModuleInit {
  constructor(private readonly configService: ConfigService<Config>) {}

  async onModuleInit() {
    await this.validateSocketExists();
  }

  private async validateSocketExists() {
    const socketPath = this.configService.get('socket.path', { infer: true });
    if (!socketPath) {
      console.error(chalk.red('Socket path is not defined.'));
      process.exit(1);
    }

    await access(socketPath, constants.F_OK).catch(() => {
      console.error(chalk.red(`Socket file ${socketPath} does not exist.`));
      process.exit(1);
    });
  }
}
