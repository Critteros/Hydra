import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';

import { MinLength } from 'class-validator';

import { User } from '@/user/schemas/user.object';

import { AssignedPermission } from './assigned-permission.object';

@ObjectType()
export class Role {
  @Field(() => String, { description: 'Role unique identifier' })
  uid!: string;

  @Field(() => String, { description: 'Role name' })
  name!: string;

  @Field(() => String, { description: 'Role description' })
  description!: string;

  @Field(() => [AssignedPermission], { description: 'Role permissions' })
  permissions!: AssignedPermission[];

  @Field(() => Int, { description: 'Number of permissions assigned to a given role' })
  permissionsCount!: number;

  @Field(() => [User], { description: 'Members of a given role' })
  members!: User[];

  @Field(() => Int, { description: 'Number of members of a given role' })
  membersCount!: number;
}

@InputType()
export class CreateRoleInput {
  @Field(() => String, { description: 'Role name' })
  @MinLength(1, { message: 'Role name cannot be empty' })
  name!: string;

  @Field(() => String, { description: 'Role description' })
  @MinLength(1, { message: 'Role description cannot be empty' })
  description!: string;
}
