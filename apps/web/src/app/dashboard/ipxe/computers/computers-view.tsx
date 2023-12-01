import 'server-only';

import { getClient } from '@/lib/server/apollo-client';

import { queryComputersWithoutGroup, queryComputerGroups } from './computer-queries';
import { ComputersTable } from './computer-table';

export async function ComputersView() {
  const {
    data: { computers: computersWithoutGroup },
  } = await getClient().query({
    query: queryComputersWithoutGroup,
  });

  const {
    data: { computerGroups },
  } = await getClient().query({
    query: queryComputerGroups,
  });

  return (
    <ComputersTable
      computers={computersWithoutGroup.map(({ viewOptions, ...rest }) => ({
        ...rest,
        ...(viewOptions && { viewOptions }),
      }))}
    />
  );
}
