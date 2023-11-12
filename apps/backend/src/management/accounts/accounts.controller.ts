import { Controller, Body, Post, ConflictException } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';

import { PublicHandler } from '@/auth/decorators/public.decorator';
import { MapErrors } from '@/errors/map-errors.decorator';
import { UserService, UserAlreadyExistsError } from '@/user/services/user.service';

import { CreateAccountDto } from './dto/account.dto';

@Controller('accounts')
@PublicHandler()
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
