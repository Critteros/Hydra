import { Resolver, Query } from '@nestjs/graphql';

import { PrismaService } from '@/database/prisma.service';

import { IpxeStrategyTemplate } from '../schemas/ipxe-strategy-template.object';

@Resolver(() => IpxeStrategyTemplate)
export class IpxeStrategyTemplateResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => [IpxeStrategyTemplate], { description: 'Retrives ipxe strategy templates' })
  async ipxeStrategyTemplates(): Promise<IpxeStrategyTemplate[]> {
    return await this.prisma.ipxeStrategyTemplate.findMany();
  }
}
