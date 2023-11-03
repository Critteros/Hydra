import { Field, ObjectType, ID, registerEnumType, PartialType, InputType } from '@nestjs/graphql';

import { AccountType } from '@prisma/client';
import { IsNotEmpty, MaxLength, MinLength, IsEmail, IsOptional } from 'class-validator';

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
}
@InputType()
export class UserUpdateInput extends PartialType(User, InputType) {}

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
