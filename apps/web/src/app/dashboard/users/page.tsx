import 'server-only';

import { AccountType } from '@/__generated__/graphql';
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
    <main className="flex grow items-center justify-center">
      <UsersTable columns={columns} data={mock_data} />
    </main>
  );
}
