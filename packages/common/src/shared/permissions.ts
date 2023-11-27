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
    /* Prevents the table of roles from being displayed */
    read: {},
    /* Hides Add Role button */
    create: {},
    /* Hides Delete button in role table selection actions */
    delete: {},
    /* AssignUsers widget is read-only */
    assignUsers: {},
    /* AssignPermissions widget is read-only */
    assignPermissions: {},
  },
  computers: {
    /* Prevents the display of computer lsit  */
    read: {},

    /* Allows adding new computer to the computer registry */
    create: {},
  },
} as const;

export type Permissions = Exclude<Path<typeof keyPath>, keyof typeof keyPath>;
