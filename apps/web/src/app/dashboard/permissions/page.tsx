import 'server-only';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Typography } from '@/components/ui/typography';
import { getClient } from '@/lib/server/apollo-client';

import { queryPermissionsSummary } from './permissions-queries';
import { PermissionsTable } from './permissions-table';

export default async function DashboardPermissionsPage() {
  const {
    data: {
      allPermissions,
      me: { permissions: currentUserPermisisons },
    },
  } = await getClient().query({ query: queryPermissionsSummary });

  return (
    <ScrollArea className="flex min-h-0 grow items-center justify-center">
      <main className="flex grow flex-col  justify-center gap-10 px-4">
        <Typography variant="h1" className="mb-4 self-start">
          Permissions
        </Typography>
        <div>
          <Typography variant="h3" className="mb-4 self-start">
            Available permissions
          </Typography>
          <PermissionsTable permissions={allPermissions} />
        </div>
        <div>
          <Typography variant="h3" className="mb-4 self-start">
            Current permissions
          </Typography>
          <PermissionsTable permissions={currentUserPermisisons} />
        </div>
      </main>
    </ScrollArea>
  );
}
