import { Module } from '@nestjs/common';

import { CreateAdminUserCommand } from './create-admin-user.command';
import { CreateAdminUserQuestion } from './create-admin-user.question';
import { CreateUserValidatorService } from './create-user-validator.service';

@Module({
  providers: [CreateAdminUserCommand, CreateAdminUserQuestion, CreateUserValidatorService],
})
export class AuthModule {}
