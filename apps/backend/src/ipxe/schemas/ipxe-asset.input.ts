import { InputType, Field } from '@nestjs/graphql';

import { RESOURCE_ID_REGEX } from '@hydra-ipxe/common/shared/regex';
import { Length, IsOptional, Matches } from 'class-validator';

import { IsAtLeaseOnePropertyDefined } from '@/utils/validators/IsAtLeastOnePropertyDefined';

@InputType()
export class WhereUniqueIpxeAssetInput {
  @Field({ description: 'Unique id of an asset', nullable: true })
  @Length(1, 255)
  @IsAtLeaseOnePropertyDefined()
  uid?: string;

  @Field({ description: 'Resource id of an asset', nullable: true })
  @Length(1, 255)
  @IsAtLeaseOnePropertyDefined()
  resourceId?: string;
}

@InputType()
export class UpdateIpxeAssetInput {
  @Field({ description: 'Resource id of an asset', nullable: true })
  @Matches(RESOURCE_ID_REGEX)
  @IsOptional()
  resourceId?: string;

  @Field({ description: 'Original filename of the asset', nullable: true })
  @Length(1, 255)
  @IsOptional()
  filename?: string;
}
