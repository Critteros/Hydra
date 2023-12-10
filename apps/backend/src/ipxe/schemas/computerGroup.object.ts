import { ObjectType, Field, ID } from '@nestjs/graphql';

import { Computer } from './computer.object';
import { IpxeStrategy } from './ipxe-strategy.object';

@ObjectType({ description: 'Presentation configuration for a computer group' })
export class ComputerGroupViewOptions {
  @Field(() => ID, { description: 'Whether to show the computer group in the list' })
  id!: number;

  @Field({ description: 'Whether to show the computer group in the list' })
  order!: number;
}

@ObjectType({ description: 'Represent a grouping of computers' })
export class ComputerGroup {
  @Field(() => ID, { description: 'Unique identifier of the computer group' })
  uid!: string;

  @Field({ description: 'Name of the computer group' })
  name!: string;

  @Field(() => [Computer], { description: 'Description of the computer group' })
  computers!: Computer[];

  @Field({
    description: 'Presentation configuration for a computer group',
    nullable: true,
  })
  viewOptions?: ComputerGroupViewOptions;

  @Field(() => IpxeStrategy, {
    description: 'Ipxe strategy used when booting',
    nullable: true,
  })
  strategy?: typeof IpxeStrategy;
}
