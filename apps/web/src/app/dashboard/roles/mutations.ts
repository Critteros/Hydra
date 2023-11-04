import { gql } from '$gql';

export const createRoleMutation = gql(`
  mutation CreateRole($input: CreateRoleInput!) {
    createRole(input: $input) {
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
  mutation AssignPermissionsToRole($roleUid: String!, $permissionIds: [String!]!) {
    assignPermissionsToRole(roleUid: $roleUid, permissionIds: $permissionIds)
  }
`);
