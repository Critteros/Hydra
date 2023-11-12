import { gql, type DocumentType } from '$gql';

import type { ArrayElement } from '@/lib/types';

export type PermissionQueryType = ArrayElement<
  DocumentType<typeof queryPermissionsSummary>['allPermissions']
>;

export const queryPermissionsSummary = gql(`
  query PermissionsSummary {
    allPermissions: permissions {
      id
      description
    }
    me {
      permissions {
        id
        description
      }
    }
  }
`);
