import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Resolver, Query, ResolveField, Parent, Mutation, Args, Int } from '@nestjs/graphql';

import type { Prisma } from '@prisma/client';

import { MapErrors } from '@/errors/map-errors.decorator';
import { RequirePermission } from '@/rbac/decorators/require-permissions.decorator';

import {
  ComputerCreateInput,
  WhereUniqueComputerInput,
  ComputerViewOptionsUpdateInput,
} from '../schemas/computer.input';
import { Computer, ComputerViewOptions } from '../schemas/computer.object';
import { WhereUniqueIpxeStrategyNullable } from '../schemas/ipxe-strategy.input';
import { IpxeStrategy } from '../schemas/ipxe-strategy.object';
import {
  ComputerService,
  ComputerNotFoundError,
  ComputerIpV4AlreadyExistsError,
  ComputerMacAlreadyExistsError,
  ComputerNameAlreadyExistsError,
} from '../services/computer.service';
import { IpxeStrategySelectorService } from '../services/ipxe-strategy-selector.service';

@Resolver(() => Computer)
export class ComputerResolver {
  constructor(
    private readonly computerService: ComputerService,
    private readonly strategySelectorService: IpxeStrategySelectorService,
  ) {}

  // ================================ Queries ================================

  @Query(() => [Computer], { description: 'Get all computers' })
  @RequirePermission('computers.read')
  async computers(
    @Args('standalone', {
      nullable: true,
      description: 'If teu then only the computers without a group assigement are returned',
    })
    standalone: boolean,
  ) {
    if (standalone) {
      return await this.computerService.findMany({ where: { computerGroup: null } });
    }

    return await this.computerService.findMany();
  }

  @Query(() => Computer, { description: 'Get a single computer', nullable: true })
  @RequirePermission('computers.read')
  async computer(@Args('where') where: WhereUniqueComputerInput) {
    return await this.computerService.find(where as Prisma.ComputerWhereUniqueInput);
  }

  // ================================ Mutations ================================

  @Mutation(() => Computer, { description: 'Create a new computer' })
  @RequirePermission('computers.create')
  @MapErrors([
    {
      if: ComputerNameAlreadyExistsError,
      then: (e: Error) => new BadRequestException(e.message),
    },
    {
      if: ComputerMacAlreadyExistsError,
      then: (e: Error) => new BadRequestException(e.message),
    },
    {
      if: ComputerIpV4AlreadyExistsError,
      then: (e: Error) => new BadRequestException(e.message),
    },
  ])
  async createComputer(@Args('data') { viewOptions, ...other }: ComputerCreateInput) {
    return await this.computerService.createComputer({
      ...other,
      ...(viewOptions && {
        viewOptions: {
          create: {
            ...viewOptions,
          },
        },
      }),
    });
  }

  @Mutation(() => Int, { description: 'Delete a computer' })
  @RequirePermission('computers.delete')
  async deleteComputers(
    @Args('where', { type: () => [WhereUniqueComputerInput] }) where: WhereUniqueComputerInput[],
  ) {
    return await this.computerService.deleteComputers({ OR: where }).then(({ count }) => count);
  }

  @Mutation(() => ComputerViewOptions, { description: 'Change the view options of a computer' })
  @MapErrors({
    if: ComputerNotFoundError,
    then: () => new NotFoundException('Rquested computer was not found'),
  })
  @RequirePermission('computers.edit')
  async changeComputerViewOptions(
    @Args('where') where: WhereUniqueComputerInput,
    @Args('data') data: ComputerViewOptionsUpdateInput,
  ) {
    return await this.computerService.changeComputerViewOptions(
      where as Prisma.ComputerWhereUniqueInput,
      data,
    );
  }

  @Mutation(() => Computer, { description: 'Changes computer ipxe strategy' })
  @RequirePermission('ipxeStrategy.apply')
  async changeComputerStrategy(
    @Args('whichComputer', {
      type: () => WhereUniqueComputerInput,
    })
    whereComputer: WhereUniqueComputerInput,
    @Args('whichStrategy', {
      type: () => WhereUniqueIpxeStrategyNullable,
      nullable: true,
    })
    whereStrategy: WhereUniqueIpxeStrategyNullable,
  ) {
    // I hate class-validator
    // if whereStrategy would be empty object then interpret it as null
    return await this.strategySelectorService.setComputerStrategy({
      whereComputer: whereComputer as Prisma.ComputerWhereUniqueInput,
      whereStrategy:
        Object.keys(whereStrategy).length !== 0
          ? (whereStrategy as Prisma.IpxeStrategyWhereUniqueInput)
          : null,
    });
  }

  // ================================ Resolvers ================================

  @ResolveField(() => ComputerViewOptions)
  async viewOptions(@Parent() computer: Computer) {
    return await this.computerService.viewOptions({ computerId: computer.uid });
  }

  @ResolveField(() => IpxeStrategy)
  async strategy(@Parent() { uid }: Computer) {
    return await this.strategySelectorService.getDirectComputerStrategy({ where: { uid } });
  }
}
