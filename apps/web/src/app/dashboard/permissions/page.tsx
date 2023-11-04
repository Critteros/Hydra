import 'server-only';

import { Typography } from '@/components/ui/typography';
import { getClient } from '@/lib/server/apollo-client';

import { queryAllPermissions } from './queries';

export default async function DashboardPermissionsPage() {
  const {
    data: { permissions },
  } = await getClient().query({ query: queryAllPermissions });
  console.log(permissions);
  return <Typography variant="h1">Permissions</Typography>;
}
