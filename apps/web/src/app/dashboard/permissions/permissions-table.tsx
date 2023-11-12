import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import type { PermissionQueryType } from './permissions-queries';

type PermissionsTableProps = {
  permissions: PermissionQueryType[];
};
export function PermissionsTable({ permissions }: PermissionsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Permission</TableHead>
          <TableHead>Description</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {permissions.map(({ id, description }, index) => (
          <TableRow key={`${id}-${index}`}>
            <TableCell className="font-semibold">{id}</TableCell>
            <TableCell>{description}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
