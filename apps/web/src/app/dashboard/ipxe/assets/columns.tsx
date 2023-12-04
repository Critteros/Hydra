'use client';

import type { ColumnDef } from '@tanstack/react-table';

import { buttonVariants } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTableColumHeader } from '@/components/ui/table/data-table-column-header';
import { cn } from '@/lib/utils';

import type { IpxeAsset } from './assets-queries';
import { CopyContents } from './table-components/copy-contents';
import { IpxeTableActions } from './table-components/ipxe-table-actions';

export const columns: ColumnDef<IpxeAsset>[] = [
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
    accessorKey: 'resourceId',
    header: ({ column }) => <DataTableColumHeader column={column} title="Resource ID" />,
    cell: ({ getValue, row }) => {
      return (
        <CopyContents
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'inline-block w-[180px] overflow-hidden text-ellipsis text-start',
          )}
          toCopy={row.original.url}
          contents={`/${getValue<string>()}`}
        />
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'filename',
    header: ({ column }) => <DataTableColumHeader column={column} title="Filename" />,
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => <DataTableColumHeader column={column} title="Created At" />,
  },
  {
    accessorKey: 'updatedAt',
    header: ({ column }) => <DataTableColumHeader column={column} title="Updated At" />,
  },
  {
    accessorKey: 'sha256',
    header: ({ column }) => <DataTableColumHeader column={column} title="SHA256" />,
    cell: ({ getValue }) => (
      <CopyContents
        className="inline-block w-[150px] overflow-hidden text-ellipsis whitespace-nowrap"
        contents={getValue<string>()}
      />
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => <IpxeTableActions row={row} />,
  },
];
