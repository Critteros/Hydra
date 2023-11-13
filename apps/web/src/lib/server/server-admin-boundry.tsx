import 'server-only';

import type { ReactNode } from 'react';

import { hasAdminAccess } from './permissions';

type ServerAdminBoundryProps = {
  children: ReactNode;
  fallback: ReactNode;
};

export async function ServerAdminBoundry({ children, fallback }: ServerAdminBoundryProps) {
  if (await hasAdminAccess()) {
    return <>{children}</>;
  }

  return <>{fallback}</>;
}
