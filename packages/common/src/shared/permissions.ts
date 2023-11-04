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
