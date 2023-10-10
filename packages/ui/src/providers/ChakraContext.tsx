'use client';

import type { ReactNode } from 'react';

import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider, createCookieStorageManager } from '@chakra-ui/react';

import customTheme, { STORAGE_KEY } from '../theme';

const storeManager = (cookies?: string) => {
  return createCookieStorageManager(STORAGE_KEY, cookies);
};

export function ChakraContext({ children, cookies }: { children: ReactNode; cookies?: string }) {
  return (
    <CacheProvider>
      <ChakraProvider
        theme={customTheme}
        colorModeManager={storeManager(
          cookies ?? (typeof document !== 'undefined' ? document.cookie : undefined),
        )}
        resetCSS
      >
        {children}
      </ChakraProvider>
    </CacheProvider>
  );
}
