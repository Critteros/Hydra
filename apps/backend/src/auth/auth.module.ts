import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { DbModule } from '@/db/db.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { SessionSerializer } from './session.serializer';
import { UserService } from './user.service';

@Module({
  imports: [DbModule, PassportModule.register({ session: true })],
  providers: [AuthService, UserService, LocalStrategy, SessionSerializer],
  exports: [AuthService, UserService],
  controllers: [AuthController],
})
export class AuthModule {}
