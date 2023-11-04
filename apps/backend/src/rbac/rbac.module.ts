import { Module } from '@nestjs/common';

import { DbModule } from '@/db/db.module';

import { PermissionResolver } from './resolvers';
import { PermissionService } from './services';

@Module({
  imports: [DbModule],
  providers: [PermissionResolver, PermissionService],
})
export class RbacModule {}
