import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';

import type { Request as RequestT } from 'express';

import { UserLoginDto } from './dto/user-login.dto';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({ type: UserLoginDto })
  async login(@Request() req: RequestT): Promise<any> {
    return {
      path: req.path,
    };
  }
}
