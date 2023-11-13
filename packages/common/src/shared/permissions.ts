import type { Path } from './type-utils';

const keyPath = {
  accounts: {
    /* Prevents the table of users from being displayed */
    read: {},
    /* Hides Add User button */
    create: {},
    /* Hides Delete button in user table selection actions */
    delete: {},
    /* Hides Edit button in user table selection actions */
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
