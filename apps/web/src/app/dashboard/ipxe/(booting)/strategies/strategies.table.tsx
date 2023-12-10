import 'server-only';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getClient } from '@/lib/server/apollo-client';

import { IpxeStrategyQuery } from './strategies-queries';
import { TableActions } from './table-actions';

export async function StrategiesTable() {
  const {
    data: { ipxeStrategies },
  } = await getClient().query({ query: IpxeStrategyQuery });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>TemplateName</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {ipxeStrategies.map(({ uid, name, description, template: { name: templateName } }) => (
          <TableRow key={uid}>
            <TableCell className="font-semibold">{name}</TableCell>
            <TableCell>{description}</TableCell>
            <TableCell>{templateName}</TableCell>
            <TableCell>
              <TableActions strategyUid={uid} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
