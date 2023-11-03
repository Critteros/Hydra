import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import { cookies } from 'next/headers';

import type { PropsWithChildren } from 'react';

import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { ApolloWrapper } from '@/lib/client/ApolloWrapper';
import { extractSessionCookie, sessionCookieName } from '@/lib/server/auth';
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

export default function RootLayout({ children }: PropsWithChildren) {
  const defaultTheme = 'dark';
  const currentTheme = cookies().get('theme')?.value ?? defaultTheme;
  return (
    <html lang="en" suppressHydrationWarning className={currentTheme}>
      <body
        className={cn(
          'flex max-h-screen min-h-screen flex-col bg-background font-sans antialiased',
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme={defaultTheme}
          enableSystem
          disableTransitionOnChange
        >
          <ApolloWrapper
            session={{ cookieName: sessionCookieName, cookie: extractSessionCookie() }}
          >
            {children}
          </ApolloWrapper>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
