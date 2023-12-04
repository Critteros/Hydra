import { ArgsType, Field } from '@nestjs/graphql';

import { RESOURCE_ID_REGEX } from '@hydra-ipxe/common/shared/regex';
import { Matches } from 'class-validator';

@ArgsType()
export class ResourceIdUpdateArgs {
  @Field({ description: 'New value for the resource id' })
  @Matches(RESOURCE_ID_REGEX)
  resourceId!: string;
}
