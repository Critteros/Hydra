import { Field, ObjectType, ID } from '@nestjs/graphql';

import { IpxeStrategy } from './ipxe-strategy.object';

@ObjectType({ description: 'Presentation configuration for a computer' })
export class ComputerViewOptions {
  @Field(() => ID, { description: 'Whether to show the computer in the list' })
  id!: number;

  @Field({ description: 'Whether to show the computer in the list' })
  order!: number;
}

@ObjectType({ description: 'Represent a computer which participates in the network boot process' })
export class Computer {
  @Field(() => ID, { description: 'Unique identifier of the computer' })
  uid!: string;

  @Field({ description: 'Name of the computer set by the user' })
  name!: string;

  @Field({ description: 'MAC address of the computer' })
  mac!: string;

  @Field({ description: 'IP address of the computer', nullable: true })
  ipv4?: string;

  @Field({
    description: 'Presentation configuration for a computer',
    nullable: true,
  })
  viewOptions?: ComputerViewOptions;

  @Field(() => IpxeStrategy, {
    description: 'Ipxe strategy used when booting',
    nullable: true,
  })
  strategy?: typeof IpxeStrategy;
}
