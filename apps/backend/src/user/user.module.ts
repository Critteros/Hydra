import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/database/database.module';
import { RbacModule } from '@/rbac/rbac.module';

// Resolvers
import { UserResolver } from './resolvers/user.resolver';
// Services
import { UserService } from './services/user.service';

@Module({
  imports: [DatabaseModule, RbacModule],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
