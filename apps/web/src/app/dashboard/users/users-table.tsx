'use client';

import { useRef, useEffect } from 'react';

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
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
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const {
    getHeaderGroups,
    getRowModel,
    previousPage,
    getCanPreviousPage,
    nextPage,
    getCanNextPage,
    initialState,
    setPageSize,
    getPageCount,
  } = useReactTable({
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
  const headerGroups = getHeaderGroups();
  const { rows } = getRowModel();
  const hasRows = rows.length > 0;
  const haveMultiplePages = getPageCount() > 1;

  useEffect(() => {
    const getPageSize = () => {
      const tableContainer = tableContainerRef.current;
      const parentElement = tableContainer?.parentElement;

      if (!tableContainer || !parentElement) {
        return initialState.pagination.pageSize;
      }

      const { height } = parentElement.getBoundingClientRect();

      const estimatedRowHeight = 56;
      const estimatedHeaderHeight = 60;

      return Math.floor((height - estimatedHeaderHeight) / estimatedRowHeight - 1);
    };

    const handleResize = () => {
      setPageSize(getPageSize());
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [initialState.pagination.pageSize, setPageSize]);

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
      {haveMultiplePages && (
        <div className="flex items-center justify-end space-x-2 p-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => previousPage()}
            disabled={!getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => nextPage()}
            disabled={!getCanNextPage()}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
