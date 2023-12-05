import 'server-only';

import { Page } from '@/components/ui/page';
import { getClient } from '@/lib/server/apollo-client';

import { IpxeTemplatesQuery } from './templates-queries';
import { IpxeStrategyTemplatesTable } from './templates-table';

export default async function StartegyTemplatesPage() {
  const {
    data: { ipxeStrategyTemplates },
  } = await getClient().query({
    query: IpxeTemplatesQuery,
  });

  return (
    <Page title="iPXE Strategy Templates">
      <IpxeStrategyTemplatesTable templates={ipxeStrategyTemplates} />
    </Page>
  );
}
