import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import { cookies } from 'next/headers';

import type { ReactNode } from 'react';

import { ThemeProvider } from '@/components/theme-provider';
import { cn } from '@/lib/utils';
import '@/styles/globals.css';

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Hydra',
  description: 'Hydra Admin website',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const defaultTheme = 'dark';
  const currentTheme = cookies().get('theme')?.value ?? defaultTheme;
  return (
    <html lang="en" suppressHydrationWarning className={currentTheme}>
      <body className={cn('flex min-h-screen flex-col bg-background font-sans antialiased')}>
        <ThemeProvider
          attribute="class"
          defaultTheme={defaultTheme}
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
