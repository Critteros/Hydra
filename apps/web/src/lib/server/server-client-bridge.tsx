import 'server-only';

import type { ReactNode } from 'react';

import { ServerClientBridgeProvider } from '@/lib/client/contexts/server-client-context';

import { getUserPermissionInfo } from './permissions';

export async function ServerClientBridge({ children }: { children?: ReactNode }) {
  return (
    <ServerClientBridgeProvider {...await getUserPermissionInfo()}>
      {children}
    </ServerClientBridgeProvider>
  );
}
