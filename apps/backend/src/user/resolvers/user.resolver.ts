import { ForbiddenError } from '@nestjs/apollo';
import { BadRequestException, InternalServerErrorException, UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Mutation, ResolveField, Parent, ID } from '@nestjs/graphql';

import { MapErrors } from '@/errors/map-errors.decorator';
import { Permission } from '@/rbac/schemas/permission.object';
import { PermissionService } from '@/rbac/services/permission.service';

import { User as InjectUser } from '../decorators/user.decorator';
import { AdminUserGuard } from '../guards/admin-user.guard';
import { AdminPasswordUpdateArgs } from '../schemas/admin-password-update.args';
import { CreateUserInput } from '../schemas/create-user.input';
import { UpdatePasswordArgs } from '../schemas/update-password.args';
import { UpdateUserInput } from '../schemas/update-user.input';
import { UserSelectionArgs } from '../schemas/user-selection.args';
import { User } from '../schemas/user.object';
import {
  UserService,
  UserNotFound,
  UserPasswordDoesNotMatch,
  UserAlreadyExistsError,
} from '../services/user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly permissionsService: PermissionService,
  ) {}

  // ================================ Queries ================================

  @Query(() => [User])
  async users() {
    const users = await this.userService.findMany({});
    return users;
  }

  @Query(() => User, { nullable: true })
  async user(@Args() { uid, email }: UserSelectionArgs) {
    return await this.userService.find({ uid, email });
  }

  @Query(() => User, { name: 'me', description: 'Returns the current user' })
  currentUser(@InjectUser() user: User) {
    return user;
  }

  // ================================ Mutations ================================

  @Mutation(() => User, { description: 'Updates user data' })
  @MapErrors({
    if: UserNotFound,
    then: () => new BadRequestException('User not found'),
  })
  async updateUser(
    @Args() { email, uid }: UserSelectionArgs,
    @Args('updateData') userData: UpdateUserInput,
    @InjectUser() user: User,
  ) {
    const targetUser = await this.userService.find({ uid, email });
    if (!targetUser) {
      throw new UserNotFound(`User with uid ${uid} or email ${email} not found`);
    }

    // Only allow the user to update their own data
    // admins can update any user data
    if (user.uid !== targetUser.uid && user.accountType !== 'ADMIN') {
      throw new ForbiddenError('You can only update your own data');
    }

    // Accouunt type can be only updated by admins
    if (userData.accountType && user.accountType !== 'ADMIN') {
      throw new ForbiddenError('You can only update your own data');
    }

    const updatedUser = await this.userService.updateUser({
      where: { uid, email },
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
    @Args() { currentPassword, newPassword }: UpdatePasswordArgs,
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
  async adminUpdateUserPassword(
    @Args() { uid, email }: UserSelectionArgs,
    @Args() { password }: AdminPasswordUpdateArgs,
  ) {
    await this.userService.updatePasswordUnckecked({ uid, email }, password);
    return true;
  }

  @Mutation(() => User, { description: 'Creates a new user' })
  @MapErrors({
    if: UserAlreadyExistsError,
    then: () => new BadRequestException('Email address already in use'),
  })
  @UseGuards(AdminUserGuard)
  async createUser(@Args('data') userData: CreateUserInput) {
    const user = await this.userService.createUser(userData);
    return user;
  }

  @Mutation(() => Boolean, { description: 'Delete multiple users' })
  async deleteMultipleUsers(@Args({ name: 'uids', type: () => [ID] }) uids: string[]) {
    return await this.userService.deleteMultipleUsers({ userUids: uids });
  }

  // ================================ Resolvers ================================

  @ResolveField(() => [Permission])
  async permissions(@Parent() { uid }: User) {
    return await this.permissionsService.getUserPermissions({ uid });
  }

  @ResolveField(() => [String])
  async permissionSet(@Parent() { uid }: User) {
    const permissions = await this.permissionsService.getUserPermissions({ uid });
    return permissions.map(({ id }) => id);
  }
}
