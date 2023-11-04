import type { Permission } from '@prisma/client';

import type { Path } from './type-utils';

const keyPath = {
  accounts: {
    read: {},
    create: {},
    changePassword: {},
    adminChangePassword: {},
    edit: {},
    loginAs: {},
  },
} as const;

export type Permissions = Exclude<Path<typeof keyPath>, keyof typeof keyPath>;

export const permissionConfig = {
  'accounts.read': {
    description: 'Grants access to reading account information',
  },
  'accounts.create': {
    description: 'Grants access to creating accounts',
  },
  'accounts.changePassword': {
    description: 'Permission to change password of other accounts knowing their current password',
  },
  'accounts.adminChangePassword': {
    description:
      'Permissions to change password of other accounts without knowing their current password',
  },
  'accounts.edit': {
    description: 'Permissions to edit other account information',
  },
  'accounts.loginAs': {
    description: 'Allows to login as other users',
  },
} as const satisfies Record<Permissions, Omit<Permission, 'id'>>;
