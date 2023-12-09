import { Resolver, Query } from '@nestjs/graphql';

import { IpxeStrategy, BasicBootStrategy } from '../schemas/ipxe-strategy.object';

@Resolver(() => IpxeStrategy)
export class IpxeStrategyResolver {
  // ================================ Queries ================================

  @Query(() => IpxeStrategy)
  sample(): BasicBootStrategy {
    return {
      description: 'Test object',
      initramfsPath: '/initrd',
      kernelPath: '/vmlinuz',
      name: 'test strategy',
      template: {
        id: 'adasd',
        description: 'test',
        name: 'strategy.basicBoot',
      },
      uid: 'asdasd',
    };
  }

  // ================================ Mutations ==============================
  // ================================ Resolvers ==============================
}
