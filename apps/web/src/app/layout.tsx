import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import { cookies } from 'next/headers';

import type { PropsWithChildren } from 'react';

import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { ApolloWrapper } from '@/lib/client/ApolloWrapper';
import { getClient } from '@/lib/server/apollo-client';
import { extractSessionCookie, sessionCookieName } from '@/lib/server/auth';
import { cn } from '@/lib/utils';
import '@/styles/globals.css';

import { CurrentUserProvider } from './current-user-context';
import { getCurrentUser } from './queries';

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Hydra',
  description: 'Hydra Admin website',
};

export default async function RootLayout({ children }: PropsWithChildren) {
  const {
    data: { me: currentUser },
  } = await getClient().query({ query: getCurrentUser });

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
          <CurrentUserProvider user={currentUser}>
            <ApolloWrapper
              // FIXME: There must be a better way to use cookies in SSR mode, this sends back the JS only cookies back to client
              session={{ cookieName: sessionCookieName, cookie: extractSessionCookie() }}
            >
              {children}
            </ApolloWrapper>
          </CurrentUserProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
