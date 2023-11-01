'use client';

import { type ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import type { User } from './queries';

type UserTableProps = {
  columns: ColumnDef<User>[];
  data: User[];
};

export function UsersTable({ columns, data }: UserTableProps) {
  const { getHeaderGroups, getRowModel } = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  const headerGroups = getHeaderGroups();
  const { rows } = getRowModel();
  const hasRows = rows.length > 0;

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {headerGroups.map(({ id: headerGroupId, headers }) => (
            <TableRow key={headerGroupId}>
              {headers.map(({ id: headerId, isPlaceholder, column: { columnDef }, getContext }) => (
                <TableHead key={headerId}>
                  {isPlaceholder ? null : flexRender(columnDef.header, getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {hasRows &&
            rows.map(({ id: rowId, getIsSelected, getVisibleCells }) => (
              <TableRow key={rowId} data-state={getIsSelected() && 'selected'}>
                {getVisibleCells().map(
                  ({
                    id: cellId,
                    column: {
                      columnDef: { cell },
                    },
                    getContext,
                  }) => (
                    <TableCell key={cellId}>{flexRender(cell, getContext())}</TableCell>
                  ),
                )}
              </TableRow>
            ))}

          {!hasRows && (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
