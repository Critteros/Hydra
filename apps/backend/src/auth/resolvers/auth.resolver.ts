import { UseGuards, BadRequestException } from '@nestjs/common';
import { Mutation, Resolver, Args } from '@nestjs/graphql';

import type { Request } from 'express';

import { AdminUserGuard } from '@/user/guards';
import { UserService } from '@/user/services/user.service';
import { exclude } from '@/utils/objects';
import { InjectRequest } from '@/utils/request.decorator';

import { UserAuthenticated } from '../guards/user-authenticated.guard';

@Resolver()
export class AuthResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => Boolean, { name: 'adminLoginAsUser', description: 'Login as a user' })
  @UseGuards(UserAuthenticated)
  @UseGuards(AdminUserGuard)
  async loginAs(@Args('uid') uid: string, @InjectRequest() request: Request) {
    const user = await this.userService.find({ uid });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    await new Promise((resolve, reject) => {
      request.logIn(exclude(user, ['password']), (err) => {
        if (err) {
          reject(err);
        }

        resolve(undefined);
      });
    });

    return true;
  }
}
