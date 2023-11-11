import { Controller, UsePipes, Body, Post, ConflictException } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';

import { CreateAccountDto } from '@hydra-ipxe/common/server/internal/dto/accounts.dto';
import { MapErrors } from '@hydra-ipxe/common/shared/errors';
import { ZodValidationPipe } from 'nestjs-zod';

import { UserService, UserAlreadyExistsError } from '@/user/services/user.service';

@Controller('accounts')
@UsePipes(ZodValidationPipe)
@ApiExcludeController(true)
export class AccountsController {
  constructor(private readonly userService: UserService) {}

  @Post('create-admin-account')
  @MapErrors({
    if: UserAlreadyExistsError,
    then: () => new ConflictException('User already exists'),
  })
  async createAdminAccount(@Body() body: CreateAccountDto) {
    await this.userService.createUser({
      ...body,
      accountType: 'ADMIN',
    });

    return {
      message: 'success',
    };
  }

  @Post('create-standard-account')
  @MapErrors({
    if: UserAlreadyExistsError,
    then: () => new ConflictException('User already exists'),
  })
  async createStandardAccount(@Body() body: CreateAccountDto) {
    await this.userService.createUser({
      ...body,
      accountType: 'STANDARD',
    });

    return {
      message: 'success',
    };
  }
}
