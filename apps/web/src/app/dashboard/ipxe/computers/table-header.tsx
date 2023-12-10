import 'server-only';

import { TableRow, TableCell, TableHeader as Header } from '@/components/ui/table';
import { ServerPermissionBoundry } from '@/lib/server/server-permission-boundry';

export function TableHeader() {
  return (
    <Header>
      <TableRow>
        <TableCell>Name</TableCell>
        <TableCell>IP Address</TableCell>
        <TableCell>MAC Address</TableCell>
        <TableCell>Strategy</TableCell>
        <ServerPermissionBoundry permission="computers.delete" fallback={<></>}>
          <TableCell className="w-10">Actions</TableCell>
        </ServerPermissionBoundry>
      </TableRow>
    </Header>
  );
}
