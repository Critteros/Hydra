import { gql } from '$gql';

export const createRoleMutation = gql(`
  mutation CreateRole($input: CreateRoleInput!) {
    createRole(input: $input) {
      __typename
    }
  }
`);
