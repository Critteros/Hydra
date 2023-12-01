'use client';

import { type ReactNode, useState } from 'react';

import { PlusIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';
import { Dialog, DialogHeader, DialogTrigger, DialogContent } from '@/components/ui/dialog';
import { TableCell, TableRow } from '@/components/ui/table';

type AddComputerProps = {
  children: ReactNode;
};

export function AddComputer({ children }: AddComputerProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <TableRow>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" asChild>
              <TableCell colSpan={3} className="table-cell text-center">
                <span className="flex justify-center">
                  <span>{children}</span>
                  <PlusIcon width={20} height={20} />
                </span>
              </TableCell>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>Add Computer</DialogHeader>
          </DialogContent>
        </Dialog>
      </TableRow>
    </>
  );
}
