import { HttpModule } from '@nestjs/axios';
import { Module, Global } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import type { Config } from '@hydra-ipxe/common/server/config';

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
export class AxiosModule {}
