import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';

import { MetadataModule } from '@/metadata/metadata.module';
import { UserModule } from '@/user/user.module';

// Controllers
import { AuthController } from './controllers/auth.controller';
// Guards
import { AuthenticatedOrPublic } from './guards/authenticated-or-public.guard';
// Resolvers
import { AuthResolver } from './resolvers/auth.resolver';
// Serializers
import { UserSerializer } from './serializers/user.serializer';
// Services
import { AuthService } from './services/auth.service';
// Strategies
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [PassportModule.register({ session: true }), UserModule, MetadataModule],
  providers: [
    AuthService,
    LocalStrategy,
    UserSerializer,
    AuthResolver,
    {
      provide: APP_GUARD,
      useClass: AuthenticatedOrPublic,
    },
  ],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
