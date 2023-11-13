import { gql, type DocumentType } from '$gql';

export type CurrentUser = DocumentType<typeof getCurrentUser>['me'];

export const getCurrentUser = gql(`
  query CurrentUser {
    me {
      uid
      email
      name
      accountType
    }
  }
`);
