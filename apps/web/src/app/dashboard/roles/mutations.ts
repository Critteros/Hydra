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
