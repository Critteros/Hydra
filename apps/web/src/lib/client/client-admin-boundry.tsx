'use client';

import type { ReactNode } from 'react';

import { usePermissions } from './hooks/permissions';

type ClientAdminBoundryProps = {
  children: ReactNode;
  fallback: ReactNode;
};

export function ClientAdminBoundry({ children, fallback }: ClientAdminBoundryProps) {
  const { hasAdminAccess } = usePermissions();

  if (hasAdminAccess()) {
    return <>{children}</>;
  }

  return <>{fallback}</>;
}
