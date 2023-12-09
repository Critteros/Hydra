import { ObjectType, Field, ID, createUnionType } from '@nestjs/graphql';

import { IPXEStrategy } from '@hydra-ipxe/common/shared/ipxe/strategies.def';
import { IpxeStrategy as PrismaIpxeStrategy } from '@prisma/client';

import { IpxeStrategyTemplate } from './ipxe-strategy-template.object';

@ObjectType({ isAbstract: true })
export class StrategyBase {
  @Field(() => ID, { description: 'Unique identifier of a strategy' })
  uid!: string;

  @Field(() => IpxeStrategyTemplate, { description: 'Template used for startegy' })
  template!: IpxeStrategyTemplate;

  @Field({ description: 'Strategy name' })
  name!: string;

  @Field({ description: 'Strategy descriptino' })
  description!: string;

  @Field({ description: 'Relative path to kernel asset file' })
  kernelPath!: string;

  @Field({ description: 'Relative path to initramfs asset file' })
  initramfsPath!: string;
}

@ObjectType()
export class BasicBootStrategy extends StrategyBase {
  @Field(() => String, {
    description: 'Kernel params passed to kernel commandline',
    nullable: true,
  })
  kernelParams?: string | null;
}

export const IpxeStrategy = createUnionType({
  name: 'IpxeStrategy',
  types: () => [BasicBootStrategy] as const,
  resolveType: (value: PrismaIpxeStrategy) => {
    switch (value.strategyTemplateId as IPXEStrategy) {
      case 'strategy.basicBoot':
        return BasicBootStrategy;
      default:
        return null;
    }
  },
});
