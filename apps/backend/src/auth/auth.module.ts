import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { DbModule } from '@/db/db.module';

import { AuthController } from './controllers';
import { UserSerializer } from './serializers';
import { AuthService, UserService } from './services';
import { LocalStrategy } from './strategies';

@Module({
  imports: [DbModule, PassportModule.register({ session: true })],
  providers: [AuthService, UserService, LocalStrategy, UserSerializer],
  exports: [AuthService, UserService],
  controllers: [AuthController],
})
export class AuthModule {}

export { AuthService, UserService };
