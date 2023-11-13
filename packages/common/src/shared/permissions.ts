import type { Path } from './type-utils';

const keyPath = {
  accounts: {
    read: {},
    create: {},
    delete: {},
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
