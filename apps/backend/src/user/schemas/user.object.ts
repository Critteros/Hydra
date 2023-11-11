import { Field, ObjectType, ID } from '@nestjs/graphql';

import { Permissions } from '@hydra-ipxe/common/shared/permissions';

import { AccountType } from './account-type.enum';

@ObjectType()
export class User {
  @Field(() => ID, { description: 'Unique identifier of the user' })
  uid!: string;

  @Field({ description: 'Email address of the user' })
  email!: string;

  @Field(() => String, { nullable: true, description: 'Nickname for the user' })
  name!: string | null;

  @Field(() => AccountType, { description: 'Type of the user account' })
  accountType!: AccountType;

  @Field(() => [String], { description: 'List of permissions assigned to the user' })
  permissions!: Permissions[];
}
