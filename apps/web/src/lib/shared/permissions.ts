import { AccountType } from '$gql/types';
import type { Permissions } from '@hydra-ipxe/common/shared/permissions';

export function hasPermissionToView({
  targetPermissions,
  userPermissions,
  accountType,
}: {
  targetPermissions: Permissions;
  userPermissions: Permissions[];
  accountType: AccountType;
}) {
  return userPermissions.includes(targetPermissions) || accountType === AccountType.Admin;
}

export function canPerformAdminAction({ accountType }: { accountType: AccountType }) {
  return accountType === AccountType.Admin;
}
