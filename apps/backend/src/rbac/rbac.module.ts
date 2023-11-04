import { Module } from '@nestjs/common';

import { DbModule } from '@/db/db.module';

import { PermissionResolver, RolesResolver } from './resolvers';
import { PermissionService, RolesService } from './services';

@Module({
  imports: [DbModule],
  providers: [PermissionResolver, PermissionService, RolesService, RolesResolver],
})
export class RbacModule {}
