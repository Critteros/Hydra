import type { IPXEStrategy } from '@hydra-ipxe/common/shared/ipxe/strategies.def';
import type { IpxeStrategyTemplate } from '@prisma/client';

export const strategyTemplates = {
  'strategy.basicBoot': {
    name: 'Basic ipxe boot',
    description: 'Ipxe boot using specified kernel and initrd',
  },
} as const satisfies Record<IPXEStrategy, Omit<IpxeStrategyTemplate, 'id'>>;
