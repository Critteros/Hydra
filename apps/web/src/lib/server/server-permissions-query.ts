import { gql } from '$gql';

export const serverClientBridgeQuery = gql(`
  query ServerClientBridgeQuery {
    me {
      uid
      permissionSet
      accountType
    }
  }
`);
