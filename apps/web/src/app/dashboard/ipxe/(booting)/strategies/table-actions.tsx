import 'server-only';

import type { IpxeStrategy } from '$gql/types';

import { ServerPermissionBoundry } from '@/lib/server/server-permission-boundry';

import { DeleteStategyAction } from './table-action-items/delete-strategy-action';
import { EditStrategyAction } from './table-action-items/edit-strategy-actions';

type TableActionsProps = {
  strategyUid: IpxeStrategy['uid'];
};

export function TableActions({ strategyUid }: TableActionsProps) {
  return (
    <div className="flex flex-row gap-2 px-2">
      <ServerPermissionBoundry permission="ipxeStrategy.delete" fallback={<></>}>
        <DeleteStategyAction strategyUid={strategyUid} />
      </ServerPermissionBoundry>
      <ServerPermissionBoundry permission="ipxeStrategy.create" fallback={<></>}>
        <EditStrategyAction strategyUid={strategyUid} />
      </ServerPermissionBoundry>
    </div>
  );
}
