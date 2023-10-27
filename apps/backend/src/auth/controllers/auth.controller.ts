import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';

import type { User as UserT } from '@prisma/client';

import { User } from '@/decorators/user';

import { UserLoginDto } from '../dto/user-login.dto';
import { LocalAuthGuard } from '../guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({ type: UserLoginDto })
  async login(@User() user: UserT): Promise<any> {
    return {
      ...user,
    };
  }
}
