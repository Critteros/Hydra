import { gql } from '$gql';

export const DeleteAssetsMutation = gql(`
  mutation DeleteAssets($where: [WhereUniqueIpxeAssetInput!]!) {
    removeAssets(where: $where)
  }
`);
