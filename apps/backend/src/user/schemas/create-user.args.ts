import { ArgsType, Field } from '@nestjs/graphql';

import { IsEmail, Length, IsOptional, IsDefined } from 'class-validator';

import { AccountType } from './account-type.enum';

@ArgsType()
export class CreateUserArgs {
  @Field(() => String, { description: 'New email address of the user', nullable: true })
  @IsDefined()
  @IsEmail({}, { message: 'Invalid email address' })
  email!: string;

  @Field(() => String, { description: 'Password for the user' })
  @IsDefined()
  @Length(8, 120, { message: 'Password must be between 8 and 120 characters long' })
  password!: string;

  @Field(() => String, { nullable: true, description: 'Nickname for the user' })
  @IsOptional()
  name?: string;

  @Field(() => AccountType, {
    description: 'Type of the user account',
    defaultValue: AccountType.STANDARD,
  })
  @IsDefined()
  accountType!: AccountType;
}
