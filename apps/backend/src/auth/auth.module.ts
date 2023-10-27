import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { UserModule } from '@/user';

import { AuthController } from './controllers';
import { UserSerializer } from './serializers';
import { AuthService } from './services';
import { LocalStrategy } from './strategies';

@Module({
  imports: [PassportModule.register({ session: true }), UserModule],
  providers: [AuthService, LocalStrategy, UserSerializer],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}

export { AuthService };
