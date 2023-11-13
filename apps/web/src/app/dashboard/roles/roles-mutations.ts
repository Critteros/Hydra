import { gql } from '$gql';

export const createRoleMutation = gql(`
  mutation CreateRole($input: CreateRoleInput!) {
    createRole(data: $input) {
      __typename
    }
  }
`);

export const deleteMultipleRolesMutation = gql(`
  mutation DeleteMultipleRoles($uids: [String!]!) {
    deleteMultipleRoles(uids: $uids)
  }
`);

export const assignPermissionsToRoleMutation = gql(`
  mutation AssignPermissionsToRole($roleUid: ID!, $permissionIds: [String!]!) {
    assignPermissionsToRole(uid: $roleUid, permissionIds: $permissionIds)
  }
`);

export const assignUsersToRoleMutation = gql(`
  mutation AssignUsersToRole($roleUid: ID!, $userUids: [String!]!) {
    assignUsersToRole(uid: $roleUid, userUids: $userUids)
  }
`);
