import { gql, type DocumentType } from '$gql';

import type { ArrayElement } from '@/lib/types';

export type User = ArrayElement<DocumentType<typeof allUsers>['users']>;

export const allUsers = gql(`
  query Users {
    users {
      uid
      email
      name
      accountType
    }
  }
`);

export const currentUser = gql(`
  query CurrentUser {
    me {
      uid
      email
      name
      accountType
    }
  }
`);
