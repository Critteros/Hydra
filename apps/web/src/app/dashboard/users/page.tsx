import 'server-only';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Typography } from '@/components/ui/typography';
import { ServerPermissionBoundry } from '@/lib/server/server-permission-boundry';

import { UserReadFallback } from './fallbacks/user-read-fallback';
import { UsersTable } from './users-table';

export default function DashboardUsersPage() {
  return (
    <ServerPermissionBoundry permission="accounts.read" fallback={<UserReadFallback />}>
      <ScrollArea className="flex min-h-0 grow items-center justify-center">
        <main className="flex grow flex-col items-center justify-center gap-10 px-4">
          <Typography variant="h1" className="mb-4 self-start">
            Users
          </Typography>
          <UsersTable />
        </main>
      </ScrollArea>
    </ServerPermissionBoundry>
  );
}
