import 'server-only';

import type { ReactNode } from 'react';

import { ServerClientBridgeProvider } from '@/lib/client/contexts/server-client-context';

import { getUserPermissions } from './permissions';

export async function ServerClientBridge({ children }: { children?: ReactNode }) {
  return (
    <ServerClientBridgeProvider permissions={await getUserPermissions()}>
      {children}
    </ServerClientBridgeProvider>
  );
}
