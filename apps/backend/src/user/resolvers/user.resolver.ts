import { BadRequestException } from '@nestjs/common';
import { Resolver, Query, Args, ID } from '@nestjs/graphql';

import { User } from '../schemas/user.schems';
import { UserService } from '../services/user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  async users() {
    const users = await this.userService.findMany({});
    return users;
  }

  @Query(() => User, { nullable: true })
  async user(
    @Args('uid', { type: () => ID, nullable: true }) uid?: string,
    @Args('email', { nullable: true }) email?: string,
  ) {
    if (!uid && !email) {
      throw new BadRequestException('uid or email must be provided');
    }

    const user = await this.userService.find({ uid, email });

    return user;
  }
}
