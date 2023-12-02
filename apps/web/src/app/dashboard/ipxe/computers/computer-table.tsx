import 'server-only';

import type { Computer } from '$gql/types';
import type { PickDeep } from 'type-fest';

import { Conditional } from '@/components/conditional';
import { Table, TableRow, TableCell, TableBody } from '@/components/ui/table';
import { ServerPermissionBoundry } from '@/lib/server/server-permission-boundry';

import { AddComputer } from './add-computer';
import { DeleteComputer } from './delete-computer';
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
    .sort((a, b) => {
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
      <TableBody>
        {tableData.map(({ key, ipv4, mac, name }) => (
          <TableRow key={key}>
            <TableCell>{name}</TableCell>
            <TableCell>{ipv4}</TableCell>
            <TableCell>{mac}</TableCell>
            <ServerPermissionBoundry permission="computers.delete" fallback={<></>}>
              <TableCell className="w-10">
                <DeleteComputer computerUid={key} />
              </TableCell>
            </ServerPermissionBoundry>
          </TableRow>
        ))}
        <ServerPermissionBoundry permission="computers.create" fallback={<></>}>
          <AddComputer groupUid={belongsToGroupUid}>Add Computer</AddComputer>
        </ServerPermissionBoundry>
      </TableBody>
    </Table>
  );
}
