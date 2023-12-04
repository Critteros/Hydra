import { Resolver, Query } from '@nestjs/graphql';

import { IpxeAsset } from '../schemas/ipxe-asset.object';
import { IpxeAssetService } from '../services/ipxe-asset.service';

@Resolver()
export class IpxeAssetResolver {
  constructor(private readonly ipxeAssetService: IpxeAssetService) {}

  // ================================ Queries ================================

  @Query(() => [IpxeAsset], { description: 'Get all ipxe assets' })
  async ipxeAssets(): Promise<IpxeAsset[]> {
    const assets = await this.ipxeAssetService.findMany();
    return assets.map((asset) => {
      return {
        ...asset,
        url: this.ipxeAssetService.getAssetURL({
          assetId: asset.id,
        }),
        filename: asset.originalFilename,
        fileSizeBytes: asset.fileSize,
      };
    });
  }

  // ================================ Mutations ================================
  // ================================ Resolvers ================================
}
