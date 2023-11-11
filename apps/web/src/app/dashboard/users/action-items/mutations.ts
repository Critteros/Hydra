import { gql } from '$gql';

export const updateUserInfoMutation = gql(`
  mutation UpdateUserInfo($uid: ID, $email: String, $name: String, $accountType: AccountType) {
    updateUser(uid: $uid, email: $email, name: $name, accountType: $accountType) {
      uid
      email
      name
      accountType
    }
  }
`);

export const changeCurentUserPasswordMutation = gql(`
  mutation ChangeCurentUserPassword($currentPassword: String!, $newPassword: String!) {
    updateCurrentUserPassword(currentPassword: $currentPassword, newPassword: $newPassword)
  }
`);

export const adminChangeUserPasswordMutation = gql(`
  mutation AdminChangeUserPassword($uid: ID!, $newPassword: String!) {
    adminUpdateUserPassword(uid: $uid, password: $newPassword)
  }
`);
