import { InputType, Field } from '@nestjs/graphql';

import { Type } from 'class-transformer';
import { IsOptional, Length, ValidateNested } from 'class-validator';

import { IsAtLeaseOnePropertyDefined } from '@/utils/validators/IsAtLeastOnePropertyDefined';

import { WhereUniqueIpxeStrategyTemplate } from './ipxe-strategy-template.input';

@InputType()
export class WhereUniqueIpxeStrategy {
  @Field(() => String, { nullable: true })
  @IsAtLeaseOnePropertyDefined()
  @Length(1, 256)
  uid?: string;

  @Field(() => String, { nullable: true })
  @IsAtLeaseOnePropertyDefined()
  @Length(1, 256)
  name?: string;
}

@InputType()
export class WhereUniqueIpxeStrategyNullable {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @Length(1, 256)
  uid?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @Length(1, 256)
  name?: string;
}

@InputType({ isAbstract: true })
class StrategyBaseCreateInput {
  @Field(() => WhereUniqueIpxeStrategyTemplate, { description: 'Ipxe strategy template selector' })
  @Type(() => WhereUniqueIpxeStrategyTemplate)
  @ValidateNested()
  template!: WhereUniqueIpxeStrategyTemplate;

  @Field(() => String, { description: 'Ipxe strategy name' })
  @Length(1, 256)
  name!: string;

  @Field(() => String, { description: 'Ipxe strategy description' })
  @Length(0, 1024)
  description!: string;

  @Field(() => String, { description: 'Relative path to a kernel asset file' })
  @Length(0, 512)
  kernelPath!: string;

  @Field(() => String, { description: 'Relative path to a initamfs asset file' })
  @Length(0, 512)
  initramfsPath!: string;
}

@InputType({ isAbstract: true })
class StrategyBaseUpdateInput {
  @Field(() => WhereUniqueIpxeStrategyTemplate, {
    description: 'Ipxe strategy template selector',
    nullable: true,
  })
  @Type(() => WhereUniqueIpxeStrategyTemplate)
  @ValidateNested()
  @IsOptional()
  template!: WhereUniqueIpxeStrategyTemplate;

  @Field(() => String, { description: 'Ipxe strategy name', nullable: true })
  @Length(1, 256)
  @IsOptional()
  name?: string;

  @Field(() => String, { description: 'Ipxe strategy description', nullable: true })
  @Length(0, 1024)
  @IsOptional()
  description!: string;

  @Field(() => String, { description: 'Relative path to a kernel asset file', nullable: true })
  @Length(0, 512)
  @IsOptional()
  kernelPath!: string;

  @Field(() => String, { description: 'Relative path to a initamfs asset file', nullable: true })
  @IsOptional()
  @Length(0, 512)
  initramfsPath!: string;
}

@InputType()
export class BasicBootStrategyCreateInput extends StrategyBaseCreateInput {
  @Field(() => String, {
    description: 'Kernel params passed to kernel commandline',
    nullable: true,
  })
  @IsOptional()
  @Length(0, 1024)
  kernelParams?: string;
}

@InputType()
export class BasicBootStrategyUpdateInput extends StrategyBaseUpdateInput {
  @Field(() => String, {
    description: 'Kernel params passed to kernel commandline',
    nullable: true,
  })
  @IsOptional()
  @Length(0, 1024)
  kernelParams?: string;
}
