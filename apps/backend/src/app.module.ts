import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { ManagementModule } from './management/management.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [ManagementModule, ConfigModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
