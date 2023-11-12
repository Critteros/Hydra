import type { Permissions } from '@hydra-ipxe/common/shared/permissions';
import type { Permission } from '@prisma/client';

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
  'accounts.edit': {
    description: 'Permissions to edit other account information',
  },
  'accounts.delete': {
    description: 'Allows to delete accounts',
  },
  'roles.read': {
    description: 'Allows to read roles',
  },
  'roles.create': {
    description: 'Allows to create roles',
  },
  'roles.delete': {
    description: 'Allows to delete roles',
  },
  'roles.assignUsers': {
    description: 'Allows to assign users to roles',
  },
  'roles.assignPermissions': {
    description: 'Allows to assign permissions to roles',
  },
} as const satisfies Record<Permissions, Omit<Permission, 'id'>>;
