import 'server-only';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import type { IpxeTemplate } from './templates-queries';

type IpxeStrategyTemplatesTableProps = {
  templates: IpxeTemplate[];
};

export function IpxeStrategyTemplatesTable({ templates }: IpxeStrategyTemplatesTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Strategy</TableHead>
          <TableHead>Description</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {templates.map(({ description, id, name }) => (
          <TableRow key={id}>
            <TableCell className="font-semibold">{name}</TableCell>
            <TableCell>{description}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
