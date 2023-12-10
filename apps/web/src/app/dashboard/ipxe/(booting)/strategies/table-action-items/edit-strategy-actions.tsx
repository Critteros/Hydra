import 'server-only';

import { gql } from '$gql';

import { getClient } from '@/lib/server/apollo-client';

import { EditStrategyDialog } from '../dialog/edit-strategy-dialog';
import type { CommonActionProps } from '../types';

const EditStrategyDataQuery = gql(`
  query EditStrategyDataQuery {
    ipxeStrategyTemplates {
      id
      name
    }
    ipxeAssets {
      uid
      resourceId
    }
  }
`);

export async function EditStrategyAction({ strategyUid }: CommonActionProps) {
  const {
    data: { ipxeStrategyTemplates: templates, ipxeAssets: assetsData },
  } = await getClient().query({ query: EditStrategyDataQuery });

  return (
    <EditStrategyDialog
      strategyUid={strategyUid}
      assetPaths={assetsData.map(({ resourceId }) => resourceId)}
      templates={templates}
    />
  );
}
