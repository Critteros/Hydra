import type { ColumnDef } from '@tanstack/react-table';

import type { User } from './queries';

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'uid',
    header: 'UID',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'accountType',
    header: 'Account Type',
  },
];
