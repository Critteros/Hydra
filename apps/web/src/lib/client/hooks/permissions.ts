'use client';

import { useCallback } from 'react';

import type { Permissions } from '@hydra-ipxe/common/shared/permissions';

import { useServerClientBridge } from '@/lib/client/contexts/server-client-context';

export function usePermissions() {
  const { permissions } = useServerClientBridge();

  const hasPermission = useCallback(
    (permission: Permissions) => {
      return permissions.includes(permission);
    },
    [permissions],
  );

  return {
    hasPermission,
    permissions,
  };
}
