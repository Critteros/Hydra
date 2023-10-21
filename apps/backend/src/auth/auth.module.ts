import { Module } from '@nestjs/common';

import { DbModule } from '@/db/db.module';

import { AuthService } from './auth.service';
import { UserService } from './user.service';

@Module({
  imports: [DbModule],
  providers: [AuthService, UserService],
  exports: [AuthService, UserService],
})
export class AuthModule {}
