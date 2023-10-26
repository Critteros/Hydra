import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';

import type { ReactNode } from 'react';

import 'server-only';

import { ThemeProvider } from '@/components/theme-provider';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { cn } from '@/lib/utils';
import '@/styles/globals.css';

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Hydra Admin',
  description: 'Hydra Admin website',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('min-h-screen bg-background font-sans antialiased')}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <ModeToggle />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
