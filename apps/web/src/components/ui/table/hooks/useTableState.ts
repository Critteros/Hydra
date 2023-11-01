'use client';

import { useState } from 'react';

import type { VisibilityState, ColumnFiltersState, SortingState } from '@tanstack/react-table';

export function useTableState() {
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  return {
    rowSelection,
    columnVisibility,
    columnFilters,
    sorting,
    setRowSelection,
    setColumnVisibility,
    setColumnFilters,
    setSorting,
  } as const;
}
