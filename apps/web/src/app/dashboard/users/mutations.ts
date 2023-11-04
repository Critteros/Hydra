import { gql } from '$gql';

export const adminLoginAsUserMutation = gql(`
  mutation AdminLoginAsUser($uid: String!) {
    adminLoginAsUser(uid: $uid)
  }
`);
