import { ArgsType, Field, Int } from '@nestjs/graphql';

import { Type } from 'class-transformer';
import { Length, ValidateNested, Min, IsOptional } from 'class-validator';

import { WhereUniqueComputerInput } from './computer.input';

@ArgsType()
export class MoveComputerAndUpdateOrderArgs {
  @Field(() => String, {
    description: 'UID of the group where the computer should be moved to',
    nullable: true,
  })
  @Length(1, 255)
  @IsOptional()
  computerGroupUid: string | null = null;

  @Field(() => WhereUniqueComputerInput, {
    description: 'Selector for computer that should be moved',
  })
  @ValidateNested()
  @Type(() => WhereUniqueComputerInput)
  whichComputer!: WhereUniqueComputerInput;

  @Field(() => Int, { description: 'New order of the computer in the group' })
  @Min(0)
  newOrder!: number;
}
