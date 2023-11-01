import 'server-only';

import { Typography } from '@/components/ui/typography';
import { getClient } from '@/lib/server/apollo-client';

import * as queries from './queries';

export default async function DashboardUsersPage() {
  const { data, error } = await getClient().query({
    query: queries.allUsers,
  });

  console.log(data, error);
  return <Typography>Dashboard Users Page</Typography>;
}
