import { gql } from '$gql';

export const adminLoginAsUserMutation = gql(`
  mutation AdminLoginAsUser($uid: String!) {
    adminLoginAsUser(uid: $uid)
  }
`);

export const createNewUserMutation = gql(`
  mutation CreateNewUser($input: CreateUserInput!) {
    createUser(data: $input) {
      uid
      email
      name
      accountType
    }
  }
`);

export const updateUserInfoMutation = gql(`
  mutation UpdateUserInfo($uid: ID!, $input: UpdateUserInput!) {
    updateUser(uid: $uid, updateData: $input) {
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

export const deleteMultipleUsersMutation = gql(`
  mutation DeleteMultipleUsers($uids: [ID!]!) {
    deleteMultipleUsers(uids: $uids)
  }
`);
