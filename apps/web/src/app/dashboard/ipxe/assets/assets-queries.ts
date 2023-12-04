import { gql, type DocumentType } from '$gql';

import type { ArrayElement } from '@/lib/types';

export type IpxeAsset = ArrayElement<DocumentType<typeof AllAssetsQuery>['ipxeAssets']>;

export const AllAssetsQuery = gql(`
  query AllAssetsQuery {
    ipxeAssets {
      uid
      resourceId
      filename
      createdAt
      updatedAt
      sha256
      url
      fileSizeBytes
    }
  }
`);
