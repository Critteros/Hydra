import { BadRequestException } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';

import { Prisma } from '@prisma/client';

import { MapErrors } from '@/errors/map-errors.decorator';
import { RequirePermission } from '@/rbac/decorators/require-permissions.decorator';

import { ResourceIdUpdateArgs } from '../schemas/ipxe-asset.args';
import { WhereUniqueIpxeAssetInput, UpdateIpxeAssetInput } from '../schemas/ipxe-asset.input';
import { IpxeAsset } from '../schemas/ipxe-asset.object';
import { IpxeAssetService, InvalidResourceIdError } from '../services/ipxe-asset.service';

type NonResolvedType = Omit<IpxeAsset, 'url'>;

@Resolver(() => IpxeAsset)
export class IpxeAssetResolver {
  constructor(private readonly ipxeAssetService: IpxeAssetService) {}

  // ================================ Queries ================================

  @Query(() => [IpxeAsset], { description: 'Get all ipxe assets' })
  @RequirePermission('ipxeAssets.read')
  async ipxeAssets(): Promise<NonResolvedType[]> {
    const assets = await this.ipxeAssetService.findMany({
      where: {
        isEntryValid: true,
      },
    });
    return assets.map((asset) => {
      return {
        ...asset,
        filename: asset.originalFilename,
        fileSizeBytes: asset.fileSize,
      };
    });
  }

  // ================================ Mutations ================================

  @Mutation(() => String, { description: 'Update resource id' })
  @MapErrors({
    if: InvalidResourceIdError,
    then: (error: Error) => new BadRequestException(error.message),
  })
  @RequirePermission('ipxeAssets.edit')
  async updateResourceId(
    @Args('where') where: WhereUniqueIpxeAssetInput,
    @Args() { resourceId }: ResourceIdUpdateArgs,
  ): Promise<string> {
    return this.ipxeAssetService.updateResourceID(
      where as Prisma.IpxeAssetsWhereUniqueInput,
      resourceId,
    );
  }

  @Mutation(() => Int, { description: 'Remove assets' })
  @RequirePermission('ipxeAssets.delete')
  async removeAssets(
    @Args('where', { type: () => [WhereUniqueIpxeAssetInput] }) where: WhereUniqueIpxeAssetInput[],
  ) {
    return await this.ipxeAssetService
      .removeFiles({
        OR: where,
      })
      .then((data) => data.length);
  }

  @Mutation(() => IpxeAsset, { description: 'Update asset metadata' })
  @RequirePermission('ipxeAssets.edit')
  async updateAssetMetadata(
    @Args('where') where: WhereUniqueIpxeAssetInput,
    @Args('data') { filename, resourceId }: UpdateIpxeAssetInput,
  ): Promise<NonResolvedType> {
    return await this.ipxeAssetService
      .updateAsset(where as Prisma.IpxeAssetsWhereUniqueInput, {
        originalFilename: filename,
        resourceId,
      })
      .then((asset) => ({
        ...asset,
        filename: asset.originalFilename,
        fileSizeBytes: asset.fileSize,
      }));
  }

  // ================================ Resolvers ================================

  @ResolveField(() => String, { description: 'URL of the asset' })
  url(@Parent() { resourceId }: IpxeAsset) {
    return this.ipxeAssetService.resolveAssetURL({ resourceId });
  }
}
