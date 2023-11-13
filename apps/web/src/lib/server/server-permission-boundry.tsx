import 'server-only';

import type { ReactNode } from 'react';

import type { Permissions } from '@hydra-ipxe/common/shared/permissions';

import { getUserPermissions } from './permissions';

type ServerPermissionBoundryProps = {
  permission: Permissions;
  fallback: ReactNode;
  children: ReactNode;
};

export async function ServerPermissionBoundry({
  permission,
  fallback,
  children,
}: ServerPermissionBoundryProps) {
  const permissions = await getUserPermissions();

  if (permissions.includes(permission)) {
    return <>{children}</>;
  }

  return <>{fallback}</>;
}
