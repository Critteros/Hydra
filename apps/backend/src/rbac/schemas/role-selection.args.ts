import { ArgsType, Field, ID } from '@nestjs/graphql';

import { IsDefined, ValidateIf, NotEquals } from 'class-validator';

@ArgsType()
export class RoleSelectionArgs {
  @Field(() => ID, { description: 'Role unique identifier', nullable: true })
  @IsDefined()
  @ValidateIf(({ name }: RoleSelectionArgs) => !name, {
    message: 'You must provide uid if name is not provided',
  })
  uid?: string;

  @Field(() => String, { description: 'Role name', nullable: true })
  @IsDefined()
  @ValidateIf(({ uid, name }: RoleSelectionArgs) => !uid || name === null, {
    message: 'You must provide name if uid is not provided',
  })
  @NotEquals(null, { message: 'Null is not an acceptable value for name' })
  name?: string;
}
