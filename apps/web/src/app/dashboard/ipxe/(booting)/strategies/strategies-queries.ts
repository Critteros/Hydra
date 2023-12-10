import { gql, type DocumentType } from '$gql';

import type { ArrayElement } from '@/lib/types';

export type IpxeStrategyDisplayData = ArrayElement<
  DocumentType<typeof IpxeStrategyQuery>['ipxeStrategies']
>;

export const IpxeStrategyQuery = gql(`
  query IpxeStrategyQuery {
    ipxeStrategies {
      __typename
      ... on BasicBootStrategy {
        uid
        template {
          id
          name
        }
        name
        description
      }
    }
  }
`);

export const BasicBootStrategyDefaultValuesQuery = gql(`
  query BasicBootStartegyDefaultValues($strategyUid: String!) {
    basicBootStrategy(where: {uid: $strategyUid}) {
     uid
     name
     description
     kernelPath
     initramfsPath
     kernelParams 
     template {
      id
     }
    }
  }
`);

export const StrategyDataQuery = gql(`
  query StrategyDataQuery {
    ipxeStrategyTemplates {
      id
      name
    }
    ipxeAssets {
      uid
      resourceId
    }
  }
`);
