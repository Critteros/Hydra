import type { InMemoryCacheConfig } from '@apollo/client';

export const cacheConfig: InMemoryCacheConfig = {
  typePolicies: {
    User: {
      keyFields: ['uid'],
    },
    Role: {
      keyFields: ['uid'],
    },
  },
};
