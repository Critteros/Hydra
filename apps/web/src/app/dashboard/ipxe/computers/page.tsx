import 'server-only';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Typography } from '@/components/ui/typography';
import { ServerPermissionBoundry } from '@/lib/server/server-permission-boundry';

import { ComputersView } from './computers-view';
import { ComputersReadFallback } from './fallbacks/computers-read-fallback';

export default function ComputersPage() {
  return (
    <ServerPermissionBoundry permission="computers.read" fallback={<ComputersReadFallback />}>
      <ScrollArea className="flex min-h-0 grow items-center justify-center">
        <main className="flex grow flex-col  justify-center gap-10 px-4">
          <Typography variant="h1" className="mb-4 self-start">
            Computers
          </Typography>
          <ComputersView />
        </main>
      </ScrollArea>
    </ServerPermissionBoundry>
  );
}
