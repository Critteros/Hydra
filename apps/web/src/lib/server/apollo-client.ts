import { env } from '$env';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc';

import { getServerFetchOptions } from './auth';

export const { getClient } = registerApolloClient(() => {
  const { cache, headers } = getServerFetchOptions();

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: `${env.BACKEND_BASE_URL}/api/graphql`,
      fetchOptions: { cache },
      headers: headers,
    }),
  });
});
