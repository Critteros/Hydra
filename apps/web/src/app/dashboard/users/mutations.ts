import { gql } from '$gql';

export const adminLoginAsUserMutation = gql(`
  mutation AdminLoginAsUser($uid: String!) {
    adminLoginAsUser(uid: $uid)
  }
`);

export const createNewUserMutation = gql(`
  mutation CreateNewUser($userData: CreateUserInput!) {
    createNewUser(userData: $userData) {
      uid
      email
      name
      accountType
    }
  }
`);
