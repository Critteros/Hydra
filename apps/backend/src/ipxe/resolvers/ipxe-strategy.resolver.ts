import { BadRequestException } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';

import { Prisma } from '@prisma/client';
import { ZodError } from 'zod';

import { MapErrors } from '@/errors/map-errors.decorator';

import { IpxeStrategyTemplate } from '../schemas/ipxe-strategy-template.object';
import {
  BasicBootStrategyCreateInput,
  WhereUniqueIpxeStrategy,
  BasicBootStrategyUpdateInput,
} from '../schemas/ipxe-strategy.input';
import { BasicBootStrategy, IpxeStrategy, StrategyBase } from '../schemas/ipxe-strategy.object';
import {
  IpxeStrategyTemplateDoesNotExists,
  InvalidStrategyTemplateName,
} from '../services/ipxe-strategy-template.service';
import {
  IpxeStrategyService,
  IpxeStrategyDoesNotExists,
  MissingBootAsset,
  StrategyAlreadyExists,
} from '../services/ipxe-strategy.service';

@Resolver(() => StrategyBase)
export class StrategyBaseResolver {
  constructor(protected readonly ipxeStrategyService: IpxeStrategyService) {}

  // ================================ Resolvers ==============================
  @ResolveField(() => IpxeStrategyTemplate)
  async template(@Parent() { uid }: StrategyBase) {
    return await this.ipxeStrategyService.getTemplateForStrategy({ uid });
  }

  @ResolveField(() => String)
  async kernelPath(@Parent() { uid }: StrategyBase) {
    return await this.resolveJsonField(uid, 'kernelPath');
  }

  @ResolveField(() => String)
  async initramfsPath(@Parent() { uid }: StrategyBase) {
    return await this.resolveJsonField(uid, 'initramfsPath');
  }

  protected async resolveJsonField(uid: string, name: string) {
    return await this.ipxeStrategyService
      .getStrategyData({ uid })
      .then((jsonData) => jsonData[name]);
  }
}

@Resolver(() => IpxeStrategy)
export class IpxeStrategyResolver {
  constructor(private readonly ipxeStrategyService: IpxeStrategyService) {}

  // ================================ Queries ================================

  @Query(() => [IpxeStrategy])
  async ipxeStrategies() {
    return await this.ipxeStrategyService.findMany();
  }

  // ================================ Mutations ==============================

  @Mutation(() => IpxeStrategy)
  @MapErrors({
    if: IpxeStrategyDoesNotExists,
    then: () => new BadRequestException('Ipxe strategy does not exists'),
  })
  async deleteIpxeStrategy(
    @Args('where', { type: () => WhereUniqueIpxeStrategy }) where: WhereUniqueIpxeStrategy,
  ) {
    return await this.ipxeStrategyService.deleteStrategy(
      where as Prisma.IpxeStrategyWhereUniqueInput,
    );
  }
}

@Resolver(() => BasicBootStrategy)
export class BasicStrategyResolver extends StrategyBaseResolver {
  // ================================ Mutations ==============================

  @Mutation(() => BasicBootStrategy)
  @MapErrors([
    {
      if: ZodError,
      then: (e: ZodError) => new BadRequestException(e.message),
    },
    {
      if: IpxeStrategyTemplateDoesNotExists,
      then: () => new BadRequestException('Ipxe strategy template does not exists'),
    },
    {
      if: InvalidStrategyTemplateName,
      then: (e: Error) => new BadRequestException(e.message),
    },
    {
      if: MissingBootAsset,
      then: (e: Error) => new BadRequestException(e.message),
    },
    {
      if: StrategyAlreadyExists,
      then: () => new BadRequestException('Strategy with provided name already exists'),
    },
  ])
  async createBasicBootStrategy(
    @Args('input', { type: () => BasicBootStrategyCreateInput })
    { name, description, template, ...jsonData }: BasicBootStrategyCreateInput,
  ) {
    return await this.ipxeStrategyService.createStrategy(
      {
        name,
        description,
        strategyTemplate: {
          connect: template as Prisma.IpxeStrategyTemplateWhereUniqueInput,
        },
      },
      jsonData,
    );
  }

  @Mutation(() => BasicBootStrategy)
  @MapErrors([
    {
      if: ZodError,
      then: (e: ZodError) => new BadRequestException(e.message),
    },
    {
      if: IpxeStrategyTemplateDoesNotExists,
      then: () => new BadRequestException('Ipxe strategy template does not exists'),
    },
    {
      if: InvalidStrategyTemplateName,
      then: (e: Error) => new BadRequestException(e.message),
    },
    {
      if: MissingBootAsset,
      then: (e: Error) => new BadRequestException(e.message),
    },
    {
      if: IpxeStrategyDoesNotExists,
      then: () => new BadRequestException('Requested ipxe strategy does not exists'),
    },
  ])
  async updateBasicBootStrategy(
    @Args('where', { type: () => WhereUniqueIpxeStrategy }) where: WhereUniqueIpxeStrategy,
    @Args('update', { type: () => BasicBootStrategyUpdateInput })
    { name, description, template, ...jsonData }: BasicBootStrategyUpdateInput,
  ) {
    return await this.ipxeStrategyService.updateStrategy({
      where: where as Prisma.IpxeStrategyWhereUniqueInput,
      update: {
        name,
        description,
        strategyTemplate: {
          connect: template as Prisma.IpxeStrategyTemplateWhereUniqueInput,
        },
      },
      configurationData: jsonData,
    });
  }

  // ================================ Resolvers ==============================

  @ResolveField(() => String, { nullable: true })
  async kernelParams(@Parent() { uid }: BasicBootStrategy) {
    return await this.resolveJsonField(uid, 'kernelParams');
  }
}
