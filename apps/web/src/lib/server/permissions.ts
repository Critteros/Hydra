import 'server-only';

import type { Permissions } from '@hydra-ipxe/common/shared/permissions';

import { hasPermissionToView, canPerformAdminAction } from '@/lib/shared/permissions';

import { getClient } from './apollo-client';
import { serverClientBridgeQuery } from './server-permissions-query';

export async function getUserPermissionInfo() {
  const {
    data: {
      me: { permissionSet, accountType },
    },
  } = await getClient().query({
    query: serverClientBridgeQuery,
  });

  return {
    permissions: permissionSet as Permissions[],
    accountType,
  } as const;
}

export async function hasPermission(permission: Permissions) {
  const { permissions, accountType } = await getUserPermissionInfo();

  return hasPermissionToView({
    targetPermissions: permission,
    userPermissions: permissions,
    accountType,
  });
}

export async function hasAdminAccess() {
  const { accountType } = await getUserPermissionInfo();

  return canPerformAdminAction({ accountType });
}
