import 'server-only';

import type { ReactNode } from 'react';

import type { Permissions } from '@hydra-ipxe/common/shared/permissions';

import { hasPermission } from './permissions';

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
  if (await hasPermission(permission)) {
    return <>{children}</>;
  }

  return <>{fallback}</>;
}
