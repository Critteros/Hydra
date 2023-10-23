import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { AxiosModule } from './axios.module';
import { ConfigModule } from './config/config.module';

@Module({
  providers: [],
  imports: [AuthModule, ConfigModule, AxiosModule],
})
export class AppModule {}
