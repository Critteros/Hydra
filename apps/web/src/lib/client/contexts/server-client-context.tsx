'use client';

import { createContext, useContext, type PropsWithChildren } from 'react';

import type { Permissions } from '@hydra-ipxe/common/shared/permissions';

export type ServerClientBridge = {
  permissions: Permissions[];
};

const ServerClientBridgeContext = createContext<ServerClientBridge | null>(null);

export function ServerClientBridgeProvider({
  children,
  ...data
}: PropsWithChildren<ServerClientBridge>) {
  return (
    <ServerClientBridgeContext.Provider value={data}>{children}</ServerClientBridgeContext.Provider>
  );
}

export function useServerClientBridge() {
  const context = useContext(ServerClientBridgeContext);
  if (context === null) {
    throw new Error('useServerClientBridge must be used within a ServerClientBridgeProvider');
  }
  return context;
}
