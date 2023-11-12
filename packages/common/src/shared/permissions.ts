import type { Path } from './type-utils';

const keyPath = {
  accounts: {
    read: {},
    create: {},
    delete: {},
    changePassword: {},
    edit: {},
  },
  roles: {
    read: {},
    create: {},
    delete: {},
    assignUsers: {},
    assignPermissions: {},
  },
} as const;

export type Permissions = Exclude<Path<typeof keyPath>, keyof typeof keyPath>;
