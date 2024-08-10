import { BadRequestException } from '@nestjs/common';
import { Mutation, Resolver, Args } from '@nestjs/graphql';

import type { Request } from 'express';

import { AdministratorOnly } from '@/rbac/decorators/administrator-only.decorator';
import { UserService } from '@/user/services/user.service';
import { exclude } from '@/utils/objects';
import { InjectRequest } from '@/utils/request.decorator';

@Resolver()
export class AuthResolver {
  constructor(private readonly userService: UserService) {}

  // ================================ Queries ================================
  // ================================ Mutations ==============================

  @Mutation(() => Boolean, { name: 'adminLoginAsUser', description: 'Login as a user' })
  @AdministratorOnly()
  async loginAs(@Args('uid') uid: string, @InjectRequest() request: Request) {
    const user = await this.userService.find({ uid });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    await new Promise((resolve, reject) => {
      request.logIn(exclude(user, ['password']), (err: Error) => {
        if (err) {
          reject(err);
        }

        resolve(undefined);
      });
    });

    return true;
  }

  // ================================ Resolvers ================================
}
