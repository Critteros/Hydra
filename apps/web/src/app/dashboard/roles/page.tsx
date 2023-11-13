import 'server-only';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Typography } from '@/components/ui/typography';
import { ServerPermissionBoundry } from '@/lib/server/server-permission-boundry';

import { RolesReadFallback } from './fallbacks/roles-read-fallback';
import { RolesTable } from './roles-table';

export default function DashboardRolesPage() {
  return (
    <ServerPermissionBoundry permission="roles.read" fallback={<RolesReadFallback />}>
      <ScrollArea className="flex min-h-0 grow items-center justify-center">
        <main className="flex grow flex-col items-center justify-center gap-10 px-4">
          <Typography variant="h1" className="mb-4 self-start">
            Roles
          </Typography>
          <RolesTable />
        </main>
      </ScrollArea>
    </ServerPermissionBoundry>
  );
}
