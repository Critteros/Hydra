import 'server-only';

import { DataTable } from '@/components/ui/table/data-table';
import { getClient } from '@/lib/server/apollo-client';
import { cn } from '@/lib/utils';

import { AllAssetsQuery } from './assets-queries';
import { columns } from './columns';

export async function AssetsTable({ className }: { className?: string }) {
  const {
    data: { ipxeAssets },
  } = await getClient().query({
    query: AllAssetsQuery,
  });

  return <DataTable columns={columns} data={ipxeAssets} className={cn('w-full', className)} />;
}
