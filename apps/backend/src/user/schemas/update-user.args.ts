import { ArgsType, PartialType, OmitType, Field } from '@nestjs/graphql';

import { AccountType } from '@prisma/client';
import { IsOptional } from 'class-validator';

import { CreateUserArgs } from './create-user.args';

const PartialUserOmmited = OmitType(PartialType(CreateUserArgs), ['password'] as const);

@ArgsType()
export class UpdateUserArgs extends PartialUserOmmited {
  @Field(() => AccountType, {
    nullable: true,
    description: 'Type of the user account',
  })
  @IsOptional()
  accountType?: AccountType;
}
