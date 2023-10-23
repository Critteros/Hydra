import { Module } from '@nestjs/common';
import { ConfigModule as NestConfig } from '@nestjs/config';

import { loadHydraConfig } from './hydra-config.config';

@Module({
  imports: [
    NestConfig.forRoot({
      isGlobal: true,
      load: [loadHydraConfig],
    }),
  ],
})
export class ConfigModule {}
