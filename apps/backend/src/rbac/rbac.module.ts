import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/database/database.module';

// Resolvers
import { PermissionResolver } from './resolvers/permission.resolver';
import { RolesResolver } from './resolvers/roles.resolver';
// Services
import { PermissionService } from './services/permission.service';
import { RolesService } from './services/roles.service';

@Module({
  imports: [DatabaseModule],
  providers: [PermissionResolver, PermissionService, RolesService, RolesResolver],
  exports: [PermissionService, RolesService],
})
export class RbacModule {}
