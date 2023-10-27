import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { DbModule } from './db/db.module';
import { ManagementModule } from './management/management.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [ManagementModule, ConfigModule, AuthModule, DbModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
