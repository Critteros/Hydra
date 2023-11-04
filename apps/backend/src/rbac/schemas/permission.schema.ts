import { ObjectType, Field } from '@nestjs/graphql';

import { User } from '@/user/schemas/user.schema';

@ObjectType()
export class Permission {
  @Field(() => String, { description: 'Unique identifier and name of the permission' })
  id!: string;
  @Field(() => String, { description: 'Description of the permission' })
  description!: string;
}

@ObjectType()
export class AssignedPermission extends Permission {
  @Field(() => User, { description: 'User who assigned specific permission', nullable: true })
  assignedBy?: User | null;

  @Field(() => Date, { description: 'Date when permission was assigned' })
  assignedAt!: Date;
}
