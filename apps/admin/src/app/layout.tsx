import type { Metadata } from 'next';

import type { ReactNode } from 'react';

import './globals.css';
import { ChakraContext } from '@hydra-ipxe/ui/providers';

export const metadata: Metadata = {
  title: 'Hydra Admin',
  description: 'Hydra Admin website',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ChakraContext>{children}</ChakraContext>
      </body>
    </html>
  );
}
