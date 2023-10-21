import { Controller, UsePipes, Body, Post } from '@nestjs/common';

import { UserService } from '@/auth/user.service';
import { CreateAccountDto } from '@hydra-ipxe/common/server/internal/dto/accounts.dto';
import { ZodValidationPipe } from 'nestjs-zod';

@Controller('accounts')
@UsePipes(ZodValidationPipe)
export class AccountsController {
  constructor(private readonly userService: UserService) {}

  @Post('create-admin-account')
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
