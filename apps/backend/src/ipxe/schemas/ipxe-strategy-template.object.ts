import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class IpxeStrategyTemplate {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  name!: string;

  @Field(() => String)
  description!: string;
}
