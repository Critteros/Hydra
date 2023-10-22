import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { AxiosModule } from './axios.module';
import { BasicCommand } from './commands/basic';
import { ConfigModule } from './config/config.module';

@Module({
  providers: [BasicCommand],
  imports: [AuthModule, ConfigModule, AxiosModule],
})
export class AppModule {}
