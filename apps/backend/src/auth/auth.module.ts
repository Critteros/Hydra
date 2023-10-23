import { Module } from '@nestjs/common';

import { DbModule } from '@/db/db.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { UserService } from './user.service';

@Module({
  imports: [DbModule],
  providers: [AuthService, UserService, LocalStrategy],
  exports: [AuthService, UserService],
  controllers: [AuthController],
})
export class AuthModule {}
