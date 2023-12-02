import 'server-only';

import { Table, TableBody, TableCell } from '@/components/ui/table';
import { getClient } from '@/lib/server/apollo-client';

import { ComputerGroup } from './computer-group';
import { queryComputersWithoutGroup, queryComputerGroups } from './computer-queries';
import { ComputersTable } from './computer-table';
import { TableHeader } from './table-header';

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

  const sortedComputerGroups = computerGroups.toSorted(
    ({ viewOptions: viewOptionsA }, { viewOptions: viewOptionsB }) => {
      const orderA = viewOptionsA?.order ?? -1;
      const orderB = viewOptionsB?.order ?? -1;

      if (orderA === -1 && orderB === -1) return 0;
      if (orderA === -1) return 1;
      if (orderB === -1) return -1;
      return orderA - orderB;
    },
  );

  return (
    <Table>
      <TableHeader />
      <TableBody>
        {sortedComputerGroups.map(({ uid: key, computers, ...groupParams }) => (
          <ComputerGroup key={key} {...groupParams}>
            <ComputersTable
              computers={computers.map(({ viewOptions, ...rest }) => ({
                ...rest,
                ...(viewOptions && { viewOptions }),
              }))}
              noHeader
              belongsToGroupUid={key}
            />
          </ComputerGroup>
        ))}
        <tr>
          <TableCell colSpan={9999} className="p-0">
            <ComputersTable
              computers={computersWithoutGroup.map(({ viewOptions, ...rest }) => ({
                ...rest,
                ...(viewOptions && { viewOptions }),
              }))}
              noHeader
            />
          </TableCell>
        </tr>
      </TableBody>
    </Table>
  );
}
