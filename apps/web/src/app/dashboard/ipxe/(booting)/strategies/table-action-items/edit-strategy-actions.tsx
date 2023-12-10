import 'server-only';

import { getClient } from '@/lib/server/apollo-client';

import { EditStrategyDialog } from '../dialog/edit-strategy-dialog';
import { StrategyDataQuery } from '../strategies-queries';
import type { CommonActionProps } from '../types';

export async function EditStrategyAction({ strategyUid }: CommonActionProps) {
  const {
    data: { ipxeStrategyTemplates: templates, ipxeAssets: assetsData },
  } = await getClient().query({ query: StrategyDataQuery });

  return (
    <EditStrategyDialog
      strategyUid={strategyUid}
      assetPaths={assetsData.map(({ resourceId }) => resourceId)}
      templates={templates}
    />
  );
}
