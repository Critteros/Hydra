import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { UserModule } from '@/user/user.module';

import { AuthController } from './controllers';
import { AuthResolver } from './resolvers';
import { UserSerializer } from './serializers';
import { AuthService } from './services';
import { LocalStrategy } from './strategies';

@Module({
  imports: [PassportModule.register({ session: true }), UserModule],
  providers: [AuthService, LocalStrategy, UserSerializer, AuthResolver],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}

export { AuthService };
