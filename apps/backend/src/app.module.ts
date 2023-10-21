import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { ManagementModule } from './management/management.module';
import { PrismaService } from './prisma.service';
import { DbModule } from './db/db.module';

@Module({
  imports: [ManagementModule, ConfigModule, AuthModule, DbModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
