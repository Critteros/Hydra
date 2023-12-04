'use client';

import Link from 'next/link';

import type { ColumnDef } from '@tanstack/react-table';

import { buttonVariants } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTableColumHeader } from '@/components/ui/table/data-table-column-header';
import { cn } from '@/lib/utils';

import type { IpxeAsset } from './assets-queries';
import { CopyContents } from './table-components/copy-contents';

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
        <Link
          className={cn('w-[120px]', buttonVariants({ variant: 'ghost' }))}
          href={row.original.url}
        >{`/${getValue<string>()}`}</Link>
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
];
