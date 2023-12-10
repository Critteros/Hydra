import 'server-only';

import { gql } from '$gql';

import { StrategyNamesQuery } from '@/app/dashboard/ipxe/(booting)/strategies/strategies-queries';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Typography } from '@/components/ui/typography';
import { getClient } from '@/lib/server/apollo-client';
import { ServerPermissionBoundry } from '@/lib/server/server-permission-boundry';

import { AddComputerGroup } from './add-group';
import { ComputersView } from './computers-view';
import { ComputersReadFallback } from './fallbacks/computers-read-fallback';
import { GlobalStrategySelector } from './global-strategy-selector';

const GlobalStrategyNameQuery = gql(`
  query GlobalStrategyName {
    globalIpxeStrategy {
      __typename
      ...on BasicBootStrategy {
        uid
        name
      }
    }
  }
`);

export default async function ComputersPage() {
  // TODO: Remove prop drilling and move to context
  const {
    data: { ipxeStrategies: strategies },
  } = await getClient().query({
    query: StrategyNamesQuery,
  });

  const {
    data: { globalIpxeStrategy: globalIpxeStrategy },
  } = await getClient().query({
    query: GlobalStrategyNameQuery,
  });

  return (
    <ServerPermissionBoundry permission="computers.read" fallback={<ComputersReadFallback />}>
      <ScrollArea className="flex min-h-0 grow items-center justify-center">
        <main className="flex grow flex-col  justify-center gap-10 px-4">
          <Typography variant="h1" className="mb-4 self-start">
            Computers
          </Typography>
          <ServerPermissionBoundry permission="computers.create" fallback={<></>}>
            <div className="flex items-end justify-end gap-4">
              <div className="flex w-[200px] grow-0 flex-col">
                <Typography variant="p">Global strategy</Typography>
                <GlobalStrategySelector strategy={globalIpxeStrategy} strategies={strategies} />
              </div>
              <AddComputerGroup />
            </div>
          </ServerPermissionBoundry>
          <ComputersView strategies={strategies} />
        </main>
      </ScrollArea>
    </ServerPermissionBoundry>
  );
}
