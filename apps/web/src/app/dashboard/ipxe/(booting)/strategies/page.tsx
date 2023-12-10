import 'server-only';

import { Page } from '@/components/ui/page';
import { ServerPermissionBoundry } from '@/lib/server/server-permission-boundry';

import { UserReadFallback } from './fallbacks/strategy-read-fallback';
import { StrategiesTable } from './strategies.table';
import { CreateStrategyAction } from './table-action-items/create-strategy-action';

export default function StrategiesPage() {
  return (
    <Page title="iPXE Strategies">
      <ServerPermissionBoundry permission="ipxeStrategy.create" fallback={<></>}>
        <CreateStrategyAction />
      </ServerPermissionBoundry>
      <ServerPermissionBoundry permission="ipxeStrategy.read" fallback={<UserReadFallback />}>
        <StrategiesTable />
      </ServerPermissionBoundry>
    </Page>
  );
}
