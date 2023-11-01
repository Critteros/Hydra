import 'server-only';

import { AccountType } from '@/__generated__/graphql';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getClient } from '@/lib/server/apollo-client';

import { columns } from './columns';
import * as queries from './queries';
import { UsersTable } from './users-table';

const mock_data = Array.from(
  { length: 100 },
  (_, i): queries.User => ({
    accountType: AccountType.Standard,
    email: `user-${i}@example.com`,
    uid: `user-${i}`,
    name: `User ${i}`,
  }),
);

export default async function DashboardUsersPage() {
  const { data } = await getClient().query({
    query: queries.allUsers,
  });

  return (
    <ScrollArea className="flex min-h-0 grow">
      <main className="flex grow items-center justify-center pr-4">
        <UsersTable columns={columns} data={mock_data} />
      </main>
    </ScrollArea>
  );
}
