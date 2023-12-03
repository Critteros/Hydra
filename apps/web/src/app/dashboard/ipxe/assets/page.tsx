import 'server-only';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Typography } from '@/components/ui/typography';
import { ServerPermissionBoundry } from '@/lib/server/server-permission-boundry';

import { IpxeAssetsReadFallback } from './fallbacks/ipxe-assets-fallback';

export default function IPXEAssetsPage() {
  return (
    <ServerPermissionBoundry permission="ipxeAssets.read" fallback={<IpxeAssetsReadFallback />}>
      <ScrollArea className="flex min-h-0 grow items-center justify-center">
        <main className="flex grow flex-col  justify-center gap-10 px-4">
          <Typography variant="h1" className="mb-4 self-start">
            IPXE Assets
          </Typography>
        </main>
      </ScrollArea>
    </ServerPermissionBoundry>
  );
}
