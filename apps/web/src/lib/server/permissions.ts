import type { Permissions } from '@hydra-ipxe/common/shared/permissions';

import { getClient } from './apollo-client';
import { serverClientBridgeQuery } from './server-permissions-query';

export async function getUserPermissions() {
  const {
    data: {
      me: { permissionSet },
    },
  } = await getClient().query({
    query: serverClientBridgeQuery,
  });

  return permissionSet as Permissions[];
}
