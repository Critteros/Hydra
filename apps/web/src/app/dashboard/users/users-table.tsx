'use client';

import { useRef } from 'react';

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DataTablePagination } from '@/components/ui/table/data-table-pagination';

import type { User } from './queries';

type UserTableProps = {
  columns: ColumnDef<User>[];
  data: User[];
};

export function UsersTable({ columns, data }: UserTableProps) {
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });
  const headerGroups = table.getHeaderGroups();
  const { rows } = table.getRowModel();
  const hasRows = rows.length > 0;

  return (
    <div className="w-full rounded-md border" ref={tableContainerRef}>
      <Table>
        <TableHeader>
          {headerGroups.map(({ id: headerGroupId, headers }) => (
            <TableRow key={headerGroupId}>
              {headers.map(({ id: headerId, isPlaceholder, column: { columnDef }, getContext }) => (
                <TableHead key={headerId} className="relative">
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

      <DataTablePagination table={table} />
    </div>
  );
}
