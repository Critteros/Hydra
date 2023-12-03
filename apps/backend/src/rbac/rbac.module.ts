import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { DatabaseModule } from '@/database/database.module';
import { MetadataModule } from '@/metadata/metadata.module';

import { PermissionGuard } from './guards/permission.guard';
// Middleware
import { PermissionsMiddleware } from './middleware/permissions.middleware';
// Resolvers
import { PermissionResolver } from './resolvers/permission.resolver';
import { RolesResolver } from './resolvers/roles.resolver';
// Services
import { PermissionService } from './services/permission.service';
import { RolesService } from './services/roles.service';

@Module({
  imports: [DatabaseModule, MetadataModule],
  providers: [
    PermissionResolver,
    PermissionService,
    RolesService,
    RolesResolver,
    {
      provide: APP_GUARD,
      useClass: PermissionGuard,
    },
  ],
  exports: [PermissionService, RolesService],
})
export class RbacModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PermissionsMiddleware).forRoutes('*');
  }
}
