import 'server-only';

import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Typography } from '@/components/ui/typography';
import { getClient } from '@/lib/server/apollo-client';

import { queryAllPermissions } from './queries';

export default async function DashboardPermissionsPage() {
  const {
    data: { permissions },
  } = await getClient().query({ query: queryAllPermissions });

  return (
    <ScrollArea className="flex min-h-0 grow items-center justify-center">
      <main className="flex grow flex-col  justify-center gap-10 px-4">
        <Typography variant="h1" className="mb-4 self-start">
          Permissions
        </Typography>
        <div>
          <Typography variant="h3" className="mb-4 self-start">
            Available permissions
          </Typography>
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
        </div>
      </main>
    </ScrollArea>
  );
}
