import { InputType, Field } from '@nestjs/graphql';

import { IsOptional, Length } from 'class-validator';

import { IsAtLeaseOnePropertyDefined } from '@/utils/validators/IsAtLeastOnePropertyDefined';

@InputType()
export class WhereUniqueIpxeStrategyTemplate {
  @Field(() => String, { description: 'Unique id of the ipxe strategy template', nullable: true })
  @IsOptional()
  @Length(1, 255)
  @IsAtLeaseOnePropertyDefined()
  id?: string;

  @Field(() => String, { description: 'Template name', nullable: true })
  @IsOptional()
  @Length(1, 255)
  @IsAtLeaseOnePropertyDefined()
  name?: string;
}
