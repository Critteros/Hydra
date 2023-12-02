import { InputType, Field } from '@nestjs/graphql';

import { Type } from 'class-transformer';
import { Length, Min, IsOptional, ValidateNested } from 'class-validator';

import { IsAtLeaseOnePropertyDefined } from '@/utils/validators/IsAtLeastOnePropertyDefined';

import { WhereUniqueComputerInput } from './computer.input';

@InputType()
export class ComputerGroupViewOptionsCreateInput {
  @Field({ description: 'Order of the computer group in the list' })
  @Min(0)
  order!: number;
}

@InputType()
export class ComputerGroupViewOptionsUpdateInput {
  @Field({ description: 'Order of the computer group in the list' })
  @IsOptional()
  @Min(0)
  order?: number;
}

@InputType()
export class WhereUniqueComputerGroupInput {
  @Field(() => String, { description: 'Unique ID of the computer group', nullable: true })
  @IsAtLeaseOnePropertyDefined()
  @Length(1, 255)
  uid?: string;

  @Field(() => String, { description: 'Name of the computer group', nullable: true })
  @IsAtLeaseOnePropertyDefined()
  @Length(1, 255)
  name?: string;
}

@InputType()
export class ComputerGroupCreateInput {
  @Field({ description: 'Name of the computer group' })
  @Length(1, 255)
  name!: string;

  @Field(() => ComputerGroupViewOptionsCreateInput, {
    description: 'Presentation configuration for a computer group',
    nullable: true,
  })
  @Type(() => ComputerGroupViewOptionsCreateInput)
  @ValidateNested()
  @IsOptional()
  viewOptions?: ComputerGroupViewOptionsCreateInput;

  @Field(() => [WhereUniqueComputerInput], {
    description: 'Computers to add to the group',
    nullable: true,
  })
  @Type(() => WhereUniqueComputerInput)
  @ValidateNested()
  @IsOptional()
  computers?: WhereUniqueComputerInput[];
}
