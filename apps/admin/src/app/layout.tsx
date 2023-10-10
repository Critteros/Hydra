import type { Metadata } from 'next';
import { cookies } from 'next/headers';

import type { ReactNode } from 'react';

import { ColorModeScript } from '@hydra-ipxe/ui';
import { ChakraContext } from '@hydra-ipxe/ui/providers';
import { STORAGE_KEY, initialColorMode } from '@hydra-ipxe/ui/theme';

import { makeCookieString } from '~/utils/cookies';

import './globals.css';

export const metadata: Metadata = {
  title: 'Hydra Admin',
  description: 'Hydra Admin website',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const cookie = cookies().get(STORAGE_KEY);
  return (
    <html lang="en">
      <body>
        <ColorModeScript
          initialColorMode={initialColorMode}
          type={'cookie'}
          storageKey={STORAGE_KEY}
        />
        <ChakraContext cookies={cookie && makeCookieString(cookie)}>{children}</ChakraContext>
      </body>
    </html>
  );
}
