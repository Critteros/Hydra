import { gql, type DocumentType } from '$gql';

import type { ArrayElement } from '@/lib/types';

export type RolePresentation = ArrayElement<DocumentType<typeof queryRoles>['roles']>;

export const queryRoles = gql(`
  query QueryRoles {
    roles {
      uid
      name
      description
      permissionsCount
      membersCount
    }
  }
`);
