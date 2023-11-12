import { Module } from '@nestjs/common';

import { ErrorsModule } from '@/errors/errors.module';
import { UserModule } from '@/user/user.module';

import { AccountsController } from './accounts.controller';

@Module({
  imports: [UserModule, ErrorsModule],
  controllers: [AccountsController],
})
export class AccountsModule {}
