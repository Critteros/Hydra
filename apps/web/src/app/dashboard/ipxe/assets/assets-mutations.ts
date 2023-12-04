import { gql } from '$gql';

export const DeleteAssetsMutation = gql(`
  mutation DeleteAssets($where: [WhereUniqueIpxeAssetInput!]!) {
    removeAssets(where: $where)
  }
`);

export const EditAssetMutation = gql(`
  mutation EditAsset($where: WhereUniqueIpxeAssetInput!, $data: UpdateIpxeAssetInput!) {
    updateAssetMetadata(where: $where, data: $data) {
      uid
      resourceId
      filename
    }
  }
`);
