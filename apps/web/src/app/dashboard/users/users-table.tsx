import 'server-only';

import { DataTable } from '@/components/ui/table/data-table';
import { getClient } from '@/lib/server/apollo-client';
import { cn } from '@/lib/utils';

import { columns } from './columns';
import { TableSelectionActions } from './table-selection-actions';
import { getAllUsers } from './user-queries';
import { UsersTableToolbar } from './users-table-toolbar';

export async function UsersTable({ className }: { className?: string }) {
  const { data } = await getClient().query({
    query: getAllUsers,
  });

  return (
    <DataTable
      columns={columns}
      data={data.users}
      className={cn('w-full', className)}
      defaultSorting={[{ id: 'accountType', desc: false }]}
      components={{ ToolBar: UsersTableToolbar, SelectionActions: TableSelectionActions }}
    />
  );
}
