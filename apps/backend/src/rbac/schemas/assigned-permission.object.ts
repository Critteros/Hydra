import { ObjectType, Field } from '@nestjs/graphql';

import { User } from '@/user/schemas/user.object';

import { Permission } from './permission.schema';

@ObjectType()
export class AssignedPermission extends Permission {
  @Field(() => User, { description: 'User who assigned specific permission', nullable: true })
  assignedBy!: User | null;

  @Field(() => Date, { description: 'Date when permission was assigned' })
  assignedAt!: Date;
}
