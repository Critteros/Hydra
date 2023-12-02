'use client';

import { type ReactNode, useState } from 'react';

import { PlusIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';
import { Dialog, DialogHeader, DialogTitle, DialogContent } from '@/components/ui/dialog';
import { TableCell, TableRow } from '@/components/ui/table';

import { CreateComputerForm } from './create-computer-form';

type AddComputerProps = {
  children: ReactNode;
  groupUid?: string;
};

export function AddComputer({ children, groupUid }: AddComputerProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <TableRow>
        <Button variant="ghost" onClick={() => setDialogOpen(!dialogOpen)} asChild>
          {/* Colspan value higher then number ofcolumns will result in the row spanning the whole table */}
          <TableCell colSpan={1000} className="table-cell text-center">
            <span className="flex justify-center gap-2">
              <span>{children}</span>
              <PlusIcon width={20} height={20} />
            </span>
          </TableCell>
        </Button>
      </TableRow>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Computer</DialogTitle>
          </DialogHeader>
          <CreateComputerForm afterSubmit={() => setDialogOpen(false)} groupUid={groupUid} />
        </DialogContent>
      </Dialog>
    </>
  );
}
