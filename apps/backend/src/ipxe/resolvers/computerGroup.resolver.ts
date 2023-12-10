import { NotFoundException } from '@nestjs/common';
import { Resolver, Query, Args, ResolveField, Parent, Mutation, Int } from '@nestjs/graphql';

import { Prisma } from '@prisma/client';

import { MapErrors } from '@/errors/map-errors.decorator';
import { RequirePermission } from '@/rbac/decorators/require-permissions.decorator';

import { WhereUniqueComputerInput } from '../schemas/computer.input';
import { Computer } from '../schemas/computer.object';
import { MoveComputerAndUpdateOrderArgs } from '../schemas/computerGroup.args';
import {
  WhereUniqueComputerGroupInput,
  ComputerGroupCreateInput,
  ComputerGroupViewOptionsUpdateInput,
} from '../schemas/computerGroup.input';
import { ComputerGroup, ComputerGroupViewOptions } from '../schemas/computerGroup.object';
import { WhereUniqueIpxeStrategyNullable } from '../schemas/ipxe-strategy.input';
import { IpxeStrategy } from '../schemas/ipxe-strategy.object';
import {
  ComputerGroupService,
  ComputerGroupNotFoundError,
  ComputerGroupNameAlreadyExistsError,
} from '../services/computerGroup.service';
import { IpxeStrategySelectorService } from '../services/ipxe-strategy-selector.service';

@Resolver(() => ComputerGroup)
export class ComputerGroupResolver {
  constructor(
    private readonly computerGroupService: ComputerGroupService,
    private readonly ipxeStrategySelectorService: IpxeStrategySelectorService,
  ) {}

  // ================================ Queries ================================

  @Query(() => [ComputerGroup], { description: 'Get all computer groups' })
  @RequirePermission('computers.read')
  async computerGroups() {
    return await this.computerGroupService.findMany();
  }

  @Query(() => ComputerGroup, { description: 'Get a single computer group', nullable: true })
  @RequirePermission('computers.read')
  async computerGroup(@Args('where') where: WhereUniqueComputerGroupInput) {
    return await this.computerGroupService.find(where as Prisma.ComputerGroupWhereUniqueInput);
  }

  // ================================ Mutations ================================

  @Mutation(() => ComputerGroup, { description: 'Create a new computer group' })
  @RequirePermission('computers.create')
  @MapErrors({
    if: ComputerGroupNameAlreadyExistsError,
    then: (e: Error) => new NotFoundException(e.message),
  })
  async createComputerGroup(
    @Args('data') { computers, viewOptions, ...other }: ComputerGroupCreateInput,
  ) {
    return await this.computerGroupService.createComputerGroup({
      ...other,
      ...(viewOptions && {
        viewOptions: {
          create: {
            ...viewOptions,
          },
        },
      }),
      computers: {
        connect: computers as Prisma.ComputerWhereUniqueInput[] | undefined,
      },
    });
  }

  @Mutation(() => ComputerGroupViewOptions, {
    description: 'Change the view options of a computer group',
  })
  @MapErrors({
    if: ComputerGroupNotFoundError,
    then: () => new NotFoundException('ComputerGroup not found'),
  })
  @RequirePermission('computers.edit')
  async changeComputerGroupViewOptions(
    @Args('where') where: WhereUniqueComputerGroupInput,
    @Args('data') data: ComputerGroupViewOptionsUpdateInput,
  ) {
    return await this.computerGroupService.changeComputerGroupViewOptions(
      where as Prisma.ComputerGroupWhereUniqueInput,
      data,
    );
  }

  @Mutation(() => ComputerGroup, { description: 'Add computers to a computer group' })
  @MapErrors({
    if: ComputerGroupNotFoundError,
    then: () => new NotFoundException('ComputerGroup not found'),
  })
  @RequirePermission('computers.edit')
  async addComputersToGroup(
    @Args('where') where: WhereUniqueComputerGroupInput,
    @Args('computers', { type: () => [WhereUniqueComputerInput] })
    computers: WhereUniqueComputerInput[],
  ) {
    return await this.computerGroupService.addComputersToGroup(
      where as Prisma.ComputerGroupWhereUniqueInput,
      {
        OR: computers,
      },
    );
  }

  @Mutation(() => ComputerGroup, { description: 'Remove computers from a computer group' })
  @MapErrors({
    if: ComputerGroupNotFoundError,
    then: () => new NotFoundException('ComputerGroup not found'),
  })
  @RequirePermission('computers.edit')
  async removeComputersFromGroup(
    @Args('where') where: WhereUniqueComputerGroupInput,
    @Args('computers', { type: () => [WhereUniqueComputerInput] })
    computers: WhereUniqueComputerInput[],
  ) {
    return await this.computerGroupService.removeComputersFromGroup(
      where as Prisma.ComputerGroupWhereUniqueInput,
      {
        OR: computers,
      },
    );
  }

  @Mutation(() => [Computer], { description: 'Move computers between groups' })
  @MapErrors({
    if: ComputerGroupNotFoundError,
    then: () => new NotFoundException('ComputerGroup not found'),
  })
  @RequirePermission('computers.edit')
  async moveComputers(
    @Args('fromGroup') fromGroup: WhereUniqueComputerGroupInput,
    @Args('toGroup') toGroup: WhereUniqueComputerGroupInput,
    @Args('computers', { type: () => [WhereUniqueComputerInput] })
    computers: WhereUniqueComputerInput[],
  ) {
    return await this.computerGroupService.moveComputers({
      from: fromGroup as Prisma.ComputerGroupWhereUniqueInput,
      to: toGroup as Prisma.ComputerGroupWhereUniqueInput,
      computers: {
        OR: computers,
      },
    });
  }

  @Mutation(() => Int, { description: 'Delete a computer group' })
  @RequirePermission('computers.delete')
  async deleteComputerGroups(
    @Args('where', { type: () => [WhereUniqueComputerGroupInput] })
    where: WhereUniqueComputerGroupInput[],
  ) {
    return await this.computerGroupService
      .deleteComputerGroups({ OR: where })
      .then(({ count }) => count);
  }

  @Mutation(() => Boolean, {
    description: 'Moves computer to a specified group and updates its order',
  })
  @RequirePermission('computers.edit')
  async moveComputerAndUpdateOrder(
    @Args() { computerGroupUid, newOrder, whichComputer }: MoveComputerAndUpdateOrderArgs,
  ) {
    await this.computerGroupService.moveComputerAndUpdateOrder({
      newOrder,
      toGroupUid: computerGroupUid,
      whichComputer: whichComputer as Prisma.ComputerWhereUniqueInput,
    });
    return true;
  }

  @Mutation(() => ComputerGroup)
  @RequirePermission('ipxeStrategy.apply')
  async changeComputerGroupStrategy(
    @Args('whichComputerGroup', {
      type: () => WhereUniqueComputerGroupInput,
    })
    whereComputerGroup: WhereUniqueComputerGroupInput,
    @Args('whichStrategy', {
      type: () => WhereUniqueIpxeStrategyNullable,
      nullable: true,
    })
    whereStrategy: WhereUniqueIpxeStrategyNullable,
  ) {
    return await this.ipxeStrategySelectorService.setComputerGroupStrategy({
      whereComputerGroup: whereComputerGroup as Prisma.ComputerGroupWhereUniqueInput,
      whereStrategy:
        Object.keys(whereStrategy).length !== 0
          ? (whereStrategy as Prisma.IpxeStrategyWhereUniqueInput)
          : null,
    });
  }

  // ================================ Resolvers ================================
  @ResolveField(() => [Computer])
  async computers(@Parent() computerGroup: ComputerGroup) {
    return await this.computerGroupService.queryComputersForGroup({ uid: computerGroup.uid });
  }

  @ResolveField(() => ComputerGroupViewOptions)
  async viewOptions(@Parent() computerGroup: ComputerGroup) {
    return await this.computerGroupService.viewOptions({
      computerGroupId: computerGroup.uid,
    });
  }

  @ResolveField(() => IpxeStrategy)
  async strategy(@Parent() { uid }: ComputerGroup) {
    return await this.ipxeStrategySelectorService.getDirectComputerGroupStrategy({
      where: { uid },
    });
  }
}
