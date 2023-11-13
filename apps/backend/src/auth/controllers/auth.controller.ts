import { promisify } from 'node:util';

import { Controller, Get, Post, UseGuards, Session, HttpStatus, HttpCode } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';

import { User as InjectUser } from '@/user/decorators/user.decorator';
import type { AuthenticatedUser } from '@/user/types';

import { PublicHandler } from '../decorators/public.decorator';
import { UserLoginDto } from '../dto/user-login.dto';
import { LocalAuthGuard } from '../guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @PublicHandler()
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: UserLoginDto })
  async login(@InjectUser() user: AuthenticatedUser) {
    return {
      ...user,
    };
  }

  @Post('logout')
  async logout(@Session() session: Express.Request['session']) {
    await promisify(session.destroy.bind(session))();
  }

  @Get('session')
  session(@InjectUser() { email, name, uid }: AuthenticatedUser) {
    return {
      uid,
      name,
      email,
    };
  }
}
