'use client';

import { useCallback } from 'react';

import type { Permissions } from '@hydra-ipxe/common/shared/permissions';

import { useServerClientBridge } from '@/lib/client/contexts/server-client-context';
import { canPerformAdminAction, hasPermissionToView } from '@/lib/shared/permissions';

export function usePermissions() {
  const { permissions, accountType } = useServerClientBridge();

  const hasPermission = useCallback(
    (permission: Permissions) => {
      return hasPermissionToView({
        accountType,
        userPermissions: permissions,
        targetPermissions: permission,
      });
    },
    [permissions, accountType],
  );

  const hasAdminAccess = useCallback(() => {
    return canPerformAdminAction({ accountType });
  }, [accountType]);

  return {
    hasPermission,
    hasAdminAccess,
    permissions,
    accountType,
  };
}
