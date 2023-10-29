import { Field, ObjectType, ID, registerEnumType } from '@nestjs/graphql';

import { AccountType } from '@prisma/client';

@ObjectType()
export class User {
  @Field(() => ID, { description: 'Unique identifier of the user' })
  uid!: string;

  @Field({ description: 'Email address of the user' })
  email!: string;

  @Field(() => String, { nullable: true, description: 'Nickname for the user' })
  name?: string | null;

  @Field(() => AccountType, { description: 'Type of the user account' })
  accountType!: AccountType;
}

registerEnumType(AccountType, {
  name: 'AccountType',
  description: 'Type of the user account',
});
