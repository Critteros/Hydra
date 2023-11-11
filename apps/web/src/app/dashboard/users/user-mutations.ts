import { gql } from '$gql';

export const adminLoginAsUserMutation = gql(`
  mutation AdminLoginAsUser($uid: String!) {
    adminLoginAsUser(uid: $uid)
  }
`);

export const createNewUserMutation = gql(`
  mutation CreateNewUser($email: String!, $password: String!, $name: String, $accountType: AccountType!) {
    createNewUser(email: $email, password: $password, name: $name, accountType: $accountType) {
      uid
      email
      name
      accountType
    }
  }
`);
