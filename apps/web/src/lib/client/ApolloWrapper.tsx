'use client';

import type { PropsWithChildren } from 'react';

import { env } from '$env';
import { ApolloLink, HttpLink } from '@apollo/client';
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  NextSSRApolloClient,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr';

import { getIsServer } from '../utils';

type SessionProp = { cookieName: string; cookie?: string };

function makeClient({ cookieName, cookie }: SessionProp) {
  return () => {
    const isServer = getIsServer();

    const uri = isServer ? `${env.BACKEND_BASE_URL}/api/graphql` : '/api/graphql';

    const httpLink = new HttpLink({
      uri,
      fetchOptions: { cache: 'no-store' },
      headers: {
        cookie: `${cookieName}=${cookie ?? ''}`,
      },
    });

    return new NextSSRApolloClient({
      cache: new NextSSRInMemoryCache(),
      link:
        typeof window === 'undefined'
          ? ApolloLink.from([
              new SSRMultipartLink({
                stripDefer: true,
              }),
              httpLink,
            ])
          : httpLink,
    });
  };
}

export function ApolloWrapper({ children, session }: PropsWithChildren<{ session: SessionProp }>) {
  return <ApolloNextAppProvider makeClient={makeClient(session)}>{children}</ApolloNextAppProvider>;
}
