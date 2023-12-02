import 'server-only';

import type { Computer } from '$gql/types';
import type { PickDeep } from 'type-fest';

import { Table, TableRow, TableCell, TableHeader, TableBody } from '@/components/ui/table';
import { ServerPermissionBoundry } from '@/lib/server/server-permission-boundry';

import { AddComputer } from './add-computer';
import { DeleteComputer } from './delete-computer';

type ComputerData = PickDeep<Computer, 'uid' | 'name' | 'mac' | 'ipv4' | 'viewOptions.order'>;

export type ComputerListProps = {
  computers: ComputerData[];
};

export function ComputersTable({ computers }: ComputerListProps) {
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
      <TableHeader>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>IP Address</TableCell>
          <TableCell>MAC Address</TableCell>
          <ServerPermissionBoundry permission="computers.delete" fallback={<></>}>
            <TableCell className="w-10">Actions</TableCell>
          </ServerPermissionBoundry>
        </TableRow>
      </TableHeader>
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
          <AddComputer>Add Computer</AddComputer>
        </ServerPermissionBoundry>
      </TableBody>
    </Table>
  );
}
