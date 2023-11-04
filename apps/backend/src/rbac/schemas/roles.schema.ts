import { ObjectType, Field, Int } from '@nestjs/graphql';

import { User } from '@/user/schemas/user.schema';

import { AssignedPermission } from './permission.schema';

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
