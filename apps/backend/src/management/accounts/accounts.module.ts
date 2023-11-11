import { Module } from '@nestjs/common';

import { AuthModule } from '@/auth/auth.module';
import { UserModule } from '@/user/user.module';

import { AccountsController } from './accounts.controller';

@Module({
  imports: [AuthModule, UserModule],
  controllers: [AccountsController],
})
export class AccountsModule {}
