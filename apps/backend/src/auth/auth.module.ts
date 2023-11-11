import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { UserModule } from '@/user/user.module';

// Controllers
import { AuthController } from './controllers/auth.controller';
// Resolvers
import { AuthResolver } from './resolvers/auth.resolver';
// Serializers
import { UserSerializer } from './serializers/user.serializer';
// Services
import { AuthService } from './services/auth.service';
// Strategies
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [PassportModule.register({ session: true }), UserModule],
  providers: [AuthService, LocalStrategy, UserSerializer, AuthResolver],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}

export { AuthService };
