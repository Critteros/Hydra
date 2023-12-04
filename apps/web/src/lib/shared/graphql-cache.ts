import type { InMemoryCacheConfig } from '@apollo/client';

export const cacheConfig: InMemoryCacheConfig = {
  typePolicies: {
    User: {
      keyFields: ['uid'],
    },
    Role: {
      keyFields: ['uid'],
    },
    Computer: {
      keyFields: ['uid'],
    },
    ComputerGroup: {
      keyFields: ['uid'],
    },
    IpxeAsset: {
      keyFields: ['uid'],
    },
  },
};
