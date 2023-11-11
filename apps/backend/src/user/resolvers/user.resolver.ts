import { ForbiddenError } from '@nestjs/apollo';
import { BadRequestException, InternalServerErrorException, UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, ID, Mutation, ResolveField, Parent } from '@nestjs/graphql';

import { MapErrors } from '@hydra-ipxe/common/shared/errors';
import { z } from 'zod';

import { UserAuthenticated } from '@/auth/guards/user-authenticated.guard';
import { Permission } from '@/rbac/schemas/permission.schema';
import { PermissionService } from '@/rbac/services/permission.service';

import { User as InjectUser } from '../decorators/user.decorator';
import { AdminUserGuard } from '../guards/admin-user.guard';
import {
  User,
  UserUpdateInput,
  UpdatePasswordInput,
  CreateUserInput,
} from '../schemas/user.schema';
import {
  UserService,
  UserNotFound,
  UserPasswordDoesNotMatch,
  UserAlreadyExistsError,
} from '../services/user.service';

@Resolver(() => User)
@UseGuards(UserAuthenticated)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly permissionsService: PermissionService,
  ) {}

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

  @Query(() => User, { name: 'me', description: 'Returns the current user' })
  currentUser(@InjectUser() user: User) {
    return user;
  }

  @ResolveField(() => [Permission], { description: 'List of permissions assigned to the user' })
  async permissions(@Parent() user: User) {
    const permissions = await this.permissionsService.getUserPermissions(user.uid);
    return permissions;
  }

  @Mutation(() => User, { description: 'Updates user data' })
  @MapErrors({
    if: UserNotFound,
    then: () => new BadRequestException('User not found'),
  })
  async updateUser(@Args('userData') userData: UserUpdateInput, @InjectUser() user: User) {
    // Only allow the user to update their own data
    // admins can update any user data
    if (user.uid !== userData.uid && user.accountType !== 'ADMIN') {
      throw new ForbiddenError('You can only update your own data');
    }

    // Accouunt type can be only updated by admins
    if (userData.accountType && user.accountType !== 'ADMIN') {
      throw new ForbiddenError('You can only update your own data');
    }

    const updatedUser = await this.userService.updateUser({
      where: { uid: userData.uid ?? user.uid },
      data: userData,
    });

    return updatedUser;
  }

  @Mutation(() => Boolean, { description: 'Updates current user password' })
  @MapErrors([
    {
      if: UserNotFound,
      then: () => new InternalServerErrorException('Current user not found'),
    },
    {
      if: UserPasswordDoesNotMatch,
      then: () => new BadRequestException('Password does not match'),
    },
  ])
  async updateCurrentUserPassword(
    @Args('data') { currentPassword, newPassword }: UpdatePasswordInput,
    @InjectUser() user: User,
  ) {
    await this.userService.updatePasswordChecked(
      {
        uid: user.uid,
      },
      {
        oldPassword: currentPassword,
        newPassword,
      },
    );

    return true;
  }

  @Mutation(() => Boolean, { description: 'Admin updates user password' })
  @MapErrors([
    {
      if: UserNotFound,
      then: () => new BadRequestException('User not found'),
    },
  ])
  @UseGuards(AdminUserGuard)
  async adminUpdateUserPassword(@Args('uid') uid: string, @Args('password') password: string) {
    if (z.string().min(1).safeParse(password).success === false) {
      throw new BadRequestException('Password must be at least 1 character long');
    }

    await this.userService.updatePasswordUnckecked({ uid }, password);
    return true;
  }

  @Mutation(() => User, { description: 'Creates a new user', name: 'createNewUser' })
  @MapErrors({
    if: UserAlreadyExistsError,
    then: () => new BadRequestException('Email address already in use'),
  })
  @UseGuards(AdminUserGuard)
  async createUser(@Args('userData') userData: CreateUserInput) {
    const user = await this.userService.createUser(userData);
    return user;
  }
}
