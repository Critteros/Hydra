import 'server-only';

import { getClient } from '@/lib/server/apollo-client';

import { columns } from './columns';
import * as queries from './queries';
import { UsersTable } from './users-table';

export default async function DashboardUsersPage() {
  const { data } = await getClient().query({
    query: queries.allUsers,
  });

  return <UsersTable columns={columns} data={data.users} />;
}
