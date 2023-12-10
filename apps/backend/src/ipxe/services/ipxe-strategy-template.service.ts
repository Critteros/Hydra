import { Injectable } from '@nestjs/common';

import { makeCustomError } from '@hydra-ipxe/common/shared/errors';
import {
  IPXEStrategySchema,
  BasicBootDataSchema,
} from '@hydra-ipxe/common/shared/ipxe/strategies.def';
import { Prisma } from '@prisma/client';

import { PrismaService } from '@/database/prisma.service';

export const InvalidStrategyTemplateName = makeCustomError('InvalidStrategyTemplateName');
export const IpxeStrategyTemplateDoesNotExists = makeCustomError(
  'IpxeStrategyTemplateDoesNotExists',
);

@Injectable()
export class IpxeStrategyTemplateService {
  constructor(private readonly prismaService: PrismaService) {}

  async checkStrategyExists(
    where: Prisma.IpxeStrategyTemplateWhereUniqueInput,
    throwError = false,
  ) {
    const exists = this.prismaService.ipxeStrategyTemplate.findUnique({ where }) !== null;
    if (!exists && throwError) {
      throw new IpxeStrategyTemplateDoesNotExists();
    }
    return exists;
  }

  getDataValidator(id?: string) {
    const res = IPXEStrategySchema.safeParse(id);
    if (!res.success) {
      throw new InvalidStrategyTemplateName(`${id} is an invalid Ipxe strategy template id`);
    }
    const { data: strategyName } = res;

    switch (strategyName) {
      case 'strategy.basicBoot':
        return BasicBootDataSchema;
    }
  }
}
