'use client';

import type { ReactNode } from 'react';

import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';

import customTheme from '../theme';

export function ChakraContext({ children }: { children: ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider theme={customTheme}>{children}</ChakraProvider>
    </CacheProvider>
  );
}
