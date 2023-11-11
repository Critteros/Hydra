import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Permission {
  @Field(() => String, { description: 'Unique identifier and name of the permission' })
  id!: string;
  @Field(() => String, { description: 'Description of the permission' })
  description!: string;
}
