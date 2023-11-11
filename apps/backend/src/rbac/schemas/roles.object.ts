import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

import { User } from '@/user/schemas/user.object';

import { AssignedPermission } from './assigned-permission.object';

@ObjectType()
export class Role {
  @Field(() => ID, { description: 'Role unique identifier' })
  uid!: string;

  @Field(() => String, { description: 'Role name' })
  name!: string;

  @Field(() => String, { description: 'Role description' })
  description!: string;

  @Field(() => [User], { description: 'Members of a given role' })
  members!: User[];

  @Field(() => Int, { description: 'Number of members of a given role' })
  memberCount!: number;

  @Field(() => [AssignedPermission], { description: 'Role permissions' })
  permissions!: AssignedPermission[];

  @Field(() => Int, {
    description: 'Number of permissions assigned to a given role',
  })
  permissionsCount!: number;
}
