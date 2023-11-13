'use client';

import type { ReactNode } from 'react';

import type { Permissions } from '@hydra-ipxe/common/shared/permissions';

import { usePermissions } from './hooks/permissions';

type ClientPermissiosnBoundryProps = {
  permission: Permissions;
  fallback: ReactNode;
  children: ReactNode;
};

export function ClientPermissiosnBoundry({
  permission,
  fallback,
  children,
}: ClientPermissiosnBoundryProps) {
  const { hasPermission } = usePermissions();

  if (hasPermission(permission)) {
    return <>{children}</>;
  }

  return <>{fallback}</>;
}
