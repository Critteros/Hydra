import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { Prisma } from '@prisma/client';

import { WhereUniqueIpxeStrategyNullable } from '../schemas/ipxe-strategy.input';
import { IpxeStrategy } from '../schemas/ipxe-strategy.object';
import { IpxeStrategySelectorService } from '../services/ipxe-strategy-selector.service';

@Resolver(() => IpxeStrategy)
export class IpxeGlobalStrategyResolver {
  constructor(private readonly ipxeSelectorService: IpxeStrategySelectorService) {}

  // ================================ Queries ================================
  @Query(() => IpxeStrategy, { nullable: true, description: 'Global ipxe strategy' })
  async globalIpxeStrategy() {
    return await this.ipxeSelectorService.getGlobalStrategy();
  }

  // ================================ Mutations ================================

  @Mutation(() => IpxeStrategy, { nullable: true, description: 'Changes global ipxe strategy' })
  async changeGlobalIpxeStrategy(
    @Args('whichStretgy', {
      type: () => WhereUniqueIpxeStrategyNullable,
      nullable: true,
    })
    whereStrategy: WhereUniqueIpxeStrategyNullable,
  ) {
    return await this.ipxeSelectorService.setGlobalStrategy({
      whichStrategy:
        Object.keys(whereStrategy).length !== 0
          ? (whereStrategy as Prisma.IpxeStrategyWhereUniqueInput)
          : null,
    });
  }
}
