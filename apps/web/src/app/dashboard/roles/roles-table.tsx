import 'server-only';

import { DataTable } from '@/components/ui/table/data-table';
import { getClient } from '@/lib/server/apollo-client';
import { cn } from '@/lib/utils';

import { columns } from './columns';
import { queryRoles } from './roles-queries';
import { RolesTableToolbar } from './roles-table-toolbar';
import { TableSelectionActions } from './table-selection-actions';

export async function RolesTable({ className }: { className?: string }) {
  const {
    data: { roles },
  } = await getClient().query({
    query: queryRoles,
  });

  return (
    <DataTable
      columns={columns}
      data={roles}
      className={cn('w-full', className)}
      components={{ ToolBar: RolesTableToolbar, SelectionActions: TableSelectionActions }}
    />
  );
}
