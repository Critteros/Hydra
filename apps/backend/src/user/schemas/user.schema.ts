import {
  Field,
  ObjectType,
  ID,
  registerEnumType,
  PartialType,
  InputType,
  PickType,
} from '@nestjs/graphql';

import { Permissions } from '@hydra-ipxe/common/shared/permissions';
import { AccountType } from '@prisma/client';
import { IsNotEmpty, MaxLength, MinLength, IsEmail, IsOptional, IsString } from 'class-validator';

@ObjectType()
export class User {
  @Field(() => ID, { description: 'Unique identifier of the user' })
  @IsNotEmpty()
  uid!: string;

  @Field({ description: 'Email address of the user' })
  @IsEmail({}, { message: 'Invalid email address' })
  @IsNotEmpty()
  email!: string;

  @Field(() => String, { nullable: true, description: 'Nickname for the user' })
  @IsOptional()
  @MinLength(1, { message: 'Name cannot be empty string' })
  @MaxLength(30, { message: 'Name is too long' })
  name?: string | null;

  @Field(() => AccountType, { description: 'Type of the user account' })
  accountType!: AccountType;

  @Field(() => [String], { description: 'List of permissions assigned to the user' })
  permissions!: Permissions[];
}
@InputType()
export class UserUpdateInput extends PartialType(
  PickType(User, ['email', 'name', 'accountType', 'uid']),
  InputType,
) {}

@InputType()
export class UpdatePasswordInput {
  @Field(() => String, { description: 'Current password' })
  @IsNotEmpty()
  currentPassword!: string;

  @Field(() => String, { description: 'New password' })
  @IsNotEmpty()
  @MinLength(4, { message: 'Password must be at least 4 characters long' })
  @MaxLength(120, { message: 'Password is too long' })
  newPassword!: string;
}

registerEnumType(AccountType, {
  name: 'AccountType',
  description: 'Type of the user account',
});

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'Email address of the user' })
  @IsString({ message: 'Name must be a string' })
  @IsEmail({}, { message: 'Invalid email address' })
  email!: string;

  @Field(() => String, { description: 'Password for the user' })
  @IsString({ message: 'Password must be a string' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password!: string;

  @Field(() => String, { nullable: true, description: 'Nickname for the user' })
  @IsOptional()
  @IsString({ message: 'Name must be a string' })
  name?: string;

  @Field(() => AccountType, { nullable: true, description: 'Type of the user account' })
  accountType?: AccountType;
}
