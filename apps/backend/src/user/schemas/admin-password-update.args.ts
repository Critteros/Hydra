import { ArgsType, Field } from '@nestjs/graphql';

import { IsNotEmpty } from 'class-validator';

@ArgsType()
export class AdminPasswordUpdateArgs {
  @Field(() => String, { description: 'New password' })
  @IsNotEmpty()
  password!: string;
}
