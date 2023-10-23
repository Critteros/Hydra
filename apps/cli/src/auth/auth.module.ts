import { Module } from '@nestjs/common';

import { CreateUserValidatorService } from './create-user-validator.service';
import { CreateAdminUserCommand, CreateStandardUserCommand } from './create-user.command';
import { CreateUserQuestion } from './create-user.question';

@Module({
  providers: [
    CreateAdminUserCommand,
    CreateUserQuestion,
    CreateUserValidatorService,
    CreateStandardUserCommand,
  ],
})
export class AuthModule {}
