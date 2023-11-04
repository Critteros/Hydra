import { gql, type DocumentType } from '$gql';

import type { ArrayElement } from '@/lib/types';

export type User = ArrayElement<DocumentType<typeof getAllUsers>['users']>;

export const getAllUsers = gql(`
  query Users {
    users {
      uid
      email
      name
      accountType
    }
  }
`);
