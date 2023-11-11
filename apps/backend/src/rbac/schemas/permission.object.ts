import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Permission {
  @Field(() => ID, { description: 'Unique identifier and name of the permission' })
  id!: string;

  @Field(() => String, { description: 'Description of the permission' })
  description!: string;
}
