import { gql } from '$gql';

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
