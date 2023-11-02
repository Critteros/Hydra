import 'server-only';

import { ScrollArea } from '@/components/ui/scroll-area';
import { DataTable } from '@/components/ui/table/data-table';
import { Typography } from '@/components/ui/typography';
import { getClient } from '@/lib/server/apollo-client';

import { columns } from './columns';
import * as queries from './queries';
import { UsersTableToolbar } from './users-table-toolbar';

export default async function DashboardUsersPage() {
  const { data } = await getClient().query({
    query: queries.getAllUsers,
  });

  return (
    <ScrollArea className="flex min-h-0 grow items-center justify-center">
      <main className="flex grow flex-col items-center justify-center gap-10 px-4">
        <Typography variant="h1" className="mb-4 self-start">
          Users
        </Typography>
        <DataTable
          columns={columns}
          data={data.users}
          className="w-full"
          components={{ ToolBar: UsersTableToolbar }}
        />
      </main>
    </ScrollArea>
  );
}
