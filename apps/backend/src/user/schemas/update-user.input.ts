import { PartialType, OmitType, Field, InputType } from '@nestjs/graphql';

import { AccountType } from '@prisma/client';
import { IsOptional } from 'class-validator';

import { CreateUserInput } from './create-user.input';

const PartialUserOmmited = OmitType(PartialType(CreateUserInput), ['password'] as const);

@InputType()
export class UpdateUserInput extends PartialUserOmmited {
  @Field(() => AccountType, {
    nullable: true,
    description: 'Type of the user account',
  })
  @IsOptional()
  accountType?: AccountType;
}
