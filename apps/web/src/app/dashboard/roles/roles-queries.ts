import { gql, type DocumentType } from '$gql';

import type { ArrayElement } from '@/lib/types';

export type RolePresentation = ArrayElement<DocumentType<typeof queryRoles>['roles']>;

export const queryRoles = gql(`
  query QueryRoles {
    roles {
      uid
      name
      description
      permissionsCount
      memberCount
    }
  }
`);

export const queryPermissionIds = gql(`
  query QueryPermissionIds {
    permissions {
      id
    }
  }
`);

export const queryRolePermissions = gql(`
  query QueryRolePermissions($uid: ID!) {
    role(uid: $uid) {
      uid
      permissions {
        id
      }
    }
    permissions {
      id
    }
  }
`);

export const queryRoleMembers = gql(`
  query QueryRoleMembers($uid: ID!) {
    role(uid: $uid) {
      uid
      members {
        uid
        email
      }
    }
    users {
      uid
      email
    }
  }
`);
