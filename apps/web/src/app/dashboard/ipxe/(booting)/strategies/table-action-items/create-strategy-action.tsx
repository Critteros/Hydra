import 'server-only';

import { getClient } from '@/lib/server/apollo-client';

import { CreateStrategyDialog } from '../dialog/create-strategy-dialog';
import { StrategyDataQuery } from '../strategies-queries';

export async function CreateStrategyAction() {
  const {
    data: { ipxeStrategyTemplates: templates, ipxeAssets: assetsData },
  } = await getClient().query({ query: StrategyDataQuery });

  return (
    <div className="self-end">
      <CreateStrategyDialog
        assetPaths={assetsData.map(({ resourceId }) => resourceId)}
        templates={templates}
      />
    </div>
  );
}
