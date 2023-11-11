import { ArgsType, Field, ID } from '@nestjs/graphql';

import { IsEmail, IsDefined, ValidateIf } from 'class-validator';

@ArgsType()
export class UserSelectionArgs {
  @Field(() => ID, { description: 'Unique identifier of the user to update', nullable: true })
  @IsDefined()
  @ValidateIf((args: UserSelectionArgs) => !args.email, {
    message: 'uid must be provided when email is not provided',
  })
  uid?: string;

  @Field(() => String, { description: 'Email of the user to update', nullable: true })
  @IsEmail()
  @IsDefined()
  @ValidateIf((args: UserSelectionArgs) => !args.uid, {
    message: 'email must be provided when uid is not provided',
  })
  email?: string;
}
