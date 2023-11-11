import 'server-only';

import { ScrollArea } from '@/components/ui/scroll-area';
import { DataTable } from '@/components/ui/table/data-table';
import { Typography } from '@/components/ui/typography';
import { getClient } from '@/lib/server/apollo-client';

import { columns } from './columns';
import { queryRoles } from './roles-queries';
import { RolesTableToolbar } from './roles-table-toolbar';
import { TableSelectionActions } from './table-selection-actions';

export default async function DashboardRolesPage() {
  const {
    data: { roles },
  } = await getClient().query({
    query: queryRoles,
  });

  return (
    <ScrollArea className="flex min-h-0 grow items-center justify-center">
      <main className="flex grow flex-col items-center justify-center gap-10 px-4">
        <Typography variant="h1" className="mb-4 self-start">
          Roles
        </Typography>
        <DataTable
          columns={columns}
          data={roles}
          className="w-full"
          components={{ ToolBar: RolesTableToolbar, SelectionActions: TableSelectionActions }}
        />
      </main>
    </ScrollArea>
  );
}
