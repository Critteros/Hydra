import 'server-only';

import type { Computer } from '$gql/types';
import type { PickDeep } from 'type-fest';

import { Conditional } from '@/components/conditional';
import { Table } from '@/components/ui/table';

import { DnDComputerTableBody } from './dnd-computer-table-body';
import { TableHeader } from './table-header';

type ComputerData = PickDeep<Computer, 'uid' | 'name' | 'mac' | 'ipv4' | 'viewOptions.order'>;

export type ComputerListProps = {
  computers: ComputerData[];
  noHeader?: boolean;
  belongsToGroupUid?: string;
};

export function ComputersTable({
  computers,
  noHeader = false,
  belongsToGroupUid,
}: ComputerListProps) {
  const tableData = computers
    .map(({ ipv4, mac, name, uid, viewOptions }) => ({
      key: uid,
      ipv4,
      mac,
      name,
      order: viewOptions?.order ?? -1,
    }))
    .toSorted((a, b) => {
      if (a.order === -1 && b.order === -1) return 1;
      if (a.order === -1) return 1;
      if (b.order === -1) return -1;
      return a.order - b.order;
    });

  return (
    <Table>
      <Conditional condition={!noHeader}>
        <TableHeader />
      </Conditional>
      <DnDComputerTableBody tableData={tableData} groupUid={belongsToGroupUid} />
    </Table>
  );
}
