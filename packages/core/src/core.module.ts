import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { loadConfiguration } from './config';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [loadConfiguration],
    }),
  ],
  providers: [PrismaService],
  exports: [],
})
export class HydraCoreModule {}
