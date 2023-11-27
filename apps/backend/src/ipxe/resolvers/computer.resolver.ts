import { Resolver, Query, ResolveField, Parent, Mutation, Args } from '@nestjs/graphql';

import type { Prisma } from '@prisma/client';

import { RequirePermission } from '@/rbac/decorators/require-permissions.decorator';

import {
  ComputerCreateInput,
  WhereUniqueComputerInput,
  ComputerViewOptionsUpdateInput,
} from '../schemas/computer.input';
import { Computer, ComputerViewOptions } from '../schemas/computer.object';
import { ComputerService } from '../services/computer.service';

@Resolver(() => Computer)
export class ComputerResolver {
  constructor(private readonly computerService: ComputerService) {}

  // ================================ Queries ================================

  @Query(() => [Computer], { description: 'Get all computers' })
  @RequirePermission('computers.read')
  async computers() {
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
  async createComputer(@Args('data') { viewOptions, ...other }: ComputerCreateInput) {
    return await this.computerService.createComputer({
      ...other,
      viewOptions: {
        create: {
          ...viewOptions,
        },
      },
    });
  }

  @Mutation(() => ComputerViewOptions, { description: 'Change the view options of a computer' })
  async changeComputerViewOptions(
    @Args('where') where: WhereUniqueComputerInput,
    @Args('data') data: ComputerViewOptionsUpdateInput,
  ) {
    return await this.computerService.changeComputerViewOptions(
      where as Prisma.ComputerWhereUniqueInput,
      data,
    );
  }

  // ================================ Resolvers ================================

  @ResolveField(() => ComputerViewOptions)
  async viewOptions(@Parent() computer: Computer) {
    return await this.computerService.viewOptions({ computerId: computer.uid });
  }
}
