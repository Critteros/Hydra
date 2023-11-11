'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { UserCog2 as AdminIcon, User as UserIcon } from 'lucide-react';

import { AccountType } from '@/__generated__/graphql';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTableColumHeader } from '@/components/ui/table/data-table-column-header';
import { cn } from '@/lib/utils';

import type { User } from './user-queries';
import { UsersTableActions } from './users-table-actions';

export const columns: ColumnDef<User>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'uid',
    header: ({ column }) => <DataTableColumHeader column={column} title="UID" />,
    cell: ({ row }) => <div className="w-[120px]">{row.getValue('uid')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'email',
    header: ({ column }) => <DataTableColumHeader column={column} title="Email" />,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumHeader column={column} title="Name" />,
    cell: ({ row }) => {
      const value = row.getValue<User['name']>('name');

      if (!value) {
        return <div className="text-muted-foreground">{'<not set>'}</div>;
      }

      return <div>{value}</div>;
    },
  },
  {
    accessorKey: 'accountType',
    header: ({ column }) => <DataTableColumHeader column={column} title="Account Type" />,
    cell: ({ row }) => {
      const value = row.getValue<User['accountType']>('accountType');
      const Icon = value === AccountType.Admin ? AdminIcon : UserIcon;
      const isAdmin = value === AccountType.Admin;
      const isUser = value === AccountType.Standard;

      return (
        <div
          className={cn(
            'flex gap-2',
            isAdmin && 'text-destructive',
            isUser && 'text-secondary-foreground',
          )}
        >
          <Icon />
          {value}
        </div>
      );
    },
    filterFn: (rows, columnId, filterValue) => {
      if (!filterValue) {
        return true;
      }
      const value = rows.getValue(columnId);

      if (!Array.isArray(filterValue)) {
        return filterValue === value;
      }

      return filterValue.includes(value);
    },
    meta: {
      label: 'Account Type',
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <UsersTableActions row={row} />,
  },
];
