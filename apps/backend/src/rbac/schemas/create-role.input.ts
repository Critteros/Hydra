import { Field, InputType } from '@nestjs/graphql';

import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateRoleInput {
  @Field(() => String, { description: 'Role name' })
  @IsNotEmpty({ message: 'Role name cannot be empty' })
  name!: string;

  @Field(() => String, { description: 'Role description' })
  @IsNotEmpty({ message: 'Role description cannot be empty' })
  description!: string;
}
