import type { Permissions } from '@hydra-ipxe/common/shared/permissions';
import type { Permission } from '@prisma/client';

export const permissionConfig = {
  'accounts.read': {
    description: 'Grants access to reading account information',
  },
  'accounts.create': {
    description: 'Grants access to creating accounts',
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
  'computers.read': {
    description: 'Allows to read computers list',
  },
  'computers.create': {
    description: 'Allows to add new computers to the registry',
  },
  'computers.edit': {
    description: 'Allows to edit computer registry',
  },
  'computers.delete': {
    description: 'Allows to delete computer registry',
  },
  'ipxeAssets.create': {
    description: 'Allows to create ipxe assets',
  },
  'ipxeAssets.read': {
    description: 'Allows to read ipxe assets',
  },
  'ipxeAssets.delete': {
    description: 'Allows to delete ipxe assets',
  },
  'ipxeAssets.edit': {
    description: 'Allows to edit ipxe assets',
  },
  'ipxeStrategy.read': {
    description: 'Allows to read ipxe strategy',
  },
  'ipxeStrategy.create': {
    description: 'Allows to create ipxe strategy',
  },
  'ipxeStrategy.delete': {
    description: 'Allows to delete ipxe strategy',
  },
  'ipxeStrategy.apply': {
    description: 'Allows to apply ipxe strategy',
  },
} as const satisfies Record<Permissions, Omit<Permission, 'id'>>;
