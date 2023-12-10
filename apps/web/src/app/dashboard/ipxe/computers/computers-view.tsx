import 'server-only';

import type { IpxeStrategy } from '$gql/types';

import { Table, TableBody, TableCell } from '@/components/ui/table';
import { getClient } from '@/lib/server/apollo-client';

import { ComputerGroup } from './computer-group';
import { queryComputersWithoutGroup, queryComputerGroups } from './computer-queries';
import { ComputersTable } from './computer-table';
import { DragContext } from './drag-context';
import { TableHeader } from './table-header';

type ComputersViewProps = {
  strategies: Array<Pick<IpxeStrategy, 'name' | 'uid'>>;
};

export async function ComputersView({ strategies }: ComputersViewProps) {
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

  const sortedComputerGroups = computerGroups.toSorted(
    ({ viewOptions: viewOptionsA, name: nameA }, { viewOptions: viewOptionsB, name: nameB }) => {
      const orderA = viewOptionsA?.order ?? -1;
      const orderB = viewOptionsB?.order ?? -1;

      if (orderA === -1 && orderB === -1) return nameA.localeCompare(nameB);
      if (orderA === -1) return 1;
      if (orderB === -1) return -1;
      return orderA - orderB;
    },
  );

  return (
    <Table>
      <TableHeader />
      <TableBody>
        <DragContext>
          {sortedComputerGroups.map(({ uid, computers, strategy, ...groupParams }) => (
            <ComputerGroup
              key={uid}
              groupUid={uid}
              strategies={strategies}
              strategy={strategy ?? undefined}
              {...groupParams}
            >
              <ComputersTable
                computers={computers.map(({ viewOptions, strategy, ...rest }) => ({
                  ...rest,
                  strategy: strategy ?? undefined,
                  ...(viewOptions && { viewOptions }),
                }))}
                noHeader
                belongsToGroupUid={uid}
                strategies={strategies}
              />
            </ComputerGroup>
          ))}
          <tr>
            <TableCell colSpan={9999} className="p-0">
              <ComputersTable
                computers={computersWithoutGroup.map(({ viewOptions, strategy, ...rest }) => ({
                  ...rest,
                  strategy: strategy ?? undefined,
                  ...(viewOptions && { viewOptions }),
                }))}
                strategies={strategies}
                noHeader
              />
            </TableCell>
          </tr>
        </DragContext>
      </TableBody>
    </Table>
  );
}
