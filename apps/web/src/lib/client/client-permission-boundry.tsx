'use client';

import type { ReactNode } from 'react';

import type { Permissions } from '@hydra-ipxe/common/shared/permissions';

import { usePermissions } from './hooks/permissions';

type ClientPermissionBoundryProps = {
  permission: Permissions;
  fallback: ReactNode;
  children: ReactNode;
};

export function ClientPermissionBoundry({
  permission,
  fallback,
  children,
}: ClientPermissionBoundryProps) {
  const { hasPermission } = usePermissions();

  if (hasPermission(permission)) {
    return <>{children}</>;
  }

  return <>{fallback}</>;
}
