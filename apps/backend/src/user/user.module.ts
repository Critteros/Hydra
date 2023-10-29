import { Module } from '@nestjs/common';

import { DbModule } from '@/db/db.module';

import { UserResolver } from './resolvers';
import { UserService } from './services';

@Module({
  imports: [DbModule],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
