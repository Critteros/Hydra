'use client';

import type { ColumnDef } from '@tanstack/react-table';

import { Checkbox } from '@/components/ui/checkbox';
import { DataTableColumHeader } from '@/components/ui/table/data-table-column-header';

import type { RolePresentation } from './queries';

export const columns: ColumnDef<RolePresentation>[] = [
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
    cell: ({ row }) => <div className="w-[80px]">{row.getValue('uid')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumHeader column={column} title="Name" />,
  },
  {
    accessorKey: 'description',
    header: ({ column }) => <DataTableColumHeader column={column} title="Description" />,
  },
  {
    accessorKey: 'permissionsCount',
    header: ({ column }) => <DataTableColumHeader column={column} title="Permissions" />,
    meta: {
      label: 'Permissions',
    },
  },
  {
    accessorKey: 'membersCount',
    header: ({ column }) => <DataTableColumHeader column={column} title="Members" />,
    meta: {
      label: 'Members',
    },
  },
];
