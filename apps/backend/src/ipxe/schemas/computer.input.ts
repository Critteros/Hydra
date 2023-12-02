import { InputType, Field } from '@nestjs/graphql';

import { Type } from 'class-transformer';
import {
  IsString,
  Length,
  IsMACAddress,
  IsIP,
  ValidateNested,
  IsOptional,
  Min,
} from 'class-validator';

import { IsAtLeaseOnePropertyDefined } from '@/utils/validators/IsAtLeastOnePropertyDefined';

@InputType()
export class ComputerViewOptionsCreateInput {
  @Field({ description: 'Order of the computer in the list' })
  @Min(0)
  order!: number;
}

@InputType()
export class ComputerViewOptionsUpdateInput {
  @Field({ description: 'Order of the computer in the list' })
  @IsOptional()
  @Min(0)
  order?: number;
}

@InputType()
export class ComputerCreateInput {
  @Field({ description: 'Name of the computer' })
  @IsString()
  @Length(1, 255)
  name!: string;

  @Field({ description: 'MAC address of the computer' })
  @IsString()
  @Length(1, 64)
  @IsMACAddress()
  mac!: string;

  @Field({ description: 'IP address of the computer' })
  @IsString()
  @IsIP(4)
  @Length(1, 32)
  ipv4!: string;

  @Field(() => ComputerViewOptionsCreateInput, {
    description: 'Presentation configuration for a computer',
    nullable: true,
  })
  @Type(() => ComputerViewOptionsCreateInput)
  @ValidateNested()
  @IsOptional()
  viewOptions?: ComputerViewOptionsCreateInput;
}

@InputType()
export class WhereUniqueComputerInput {
  @Field(() => String, { nullable: true })
  @IsAtLeaseOnePropertyDefined()
  @Length(1, 255, {})
  uid?: string;

  @Field(() => String, { nullable: true })
  @IsAtLeaseOnePropertyDefined()
  @Length(1, 255)
  name?: string;

  @Field(() => String, { nullable: true })
  @IsAtLeaseOnePropertyDefined()
  @Length(1, 64)
  @IsMACAddress()
  mac?: string;

  @Field(() => String, { nullable: true })
  @IsAtLeaseOnePropertyDefined()
  @IsIP(4)
  @Length(1, 32)
  ipv4?: string;
}
