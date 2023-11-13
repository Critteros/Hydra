import { ArgsType, Field } from '@nestjs/graphql';

import { Length, IsNotEmpty, IsDefined } from 'class-validator';

@ArgsType()
export class UpdatePasswordArgs {
  @Field(() => String, { description: 'Current password' })
  @IsNotEmpty()
  @IsDefined()
  currentPassword!: string;

  @Field(() => String, { description: 'New password' })
  @IsDefined()
  @Length(4, 120, { message: 'Password must be between 4 and 120 characters long' })
  newPassword!: string;
}
