import { gql } from '$gql';

export const updateUserInfoMutation = gql(`
  mutation UpdateUserInfo($userData: UserUpdateInput!) {
    updateUser(userData: $userData) {
      uid
      email
      name
      accountType
    }
  }
`);

export const changeCurentUserPasswordMutation = gql(`
  mutation ChangeCurentUserPassword($data: UpdatePasswordInput!) {
    updateCurrentUserPassword(data: $data)
  }
`);
