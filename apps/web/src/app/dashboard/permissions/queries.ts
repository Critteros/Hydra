import { gql, type DocumentType } from '$gql';

import type { ArrayElement } from '@/lib/types';

export type PermissionQueryType = ArrayElement<
  DocumentType<typeof queryAllPermissions>['permissions']
>;

export const queryAllPermissions = gql(`
  query AllPermissions {
    permissions {
      id
      description
    }
  } 
`);
