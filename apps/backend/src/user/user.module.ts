import { Module } from '@nestjs/common';

import { DbModule } from '@/db/db.module';
import { RbacModule } from '@/rbac/rbac.module';

import { UserResolver } from './resolvers';
import { UserService } from './services';

@Module({
  imports: [DbModule, RbacModule],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
