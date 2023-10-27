import { promisify } from 'node:util';

import { Controller, Get, Post, UseGuards, Session } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';

import { User, type AuthenticatedUser } from '@/user';

import { PublicRoute } from '../decorators/public.decorator';
import { UserLoginDto } from '../dto/user-login.dto';
import { UserAuthenticated } from '../guards';
import { LocalAuthGuard } from '../guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @PublicRoute()
  @ApiBody({ type: UserLoginDto })
  async login(@User() user: AuthenticatedUser) {
    return {
      ...user,
    };
  }

  @Post('logout')
  async logout(@Session() session: Express.Request['session']) {
    await promisify(session.destroy.bind(session))();
  }

  @Get('session')
  @UseGuards(UserAuthenticated)
  session(@User() { email, name, uid }: AuthenticatedUser) {
    return {
      uid,
      name,
      email,
    };
  }
}
