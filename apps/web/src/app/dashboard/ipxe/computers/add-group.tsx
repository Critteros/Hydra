'use client';

import { useState } from 'react';

import { PlusIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { CreateComputerGroupForm } from './create-group-form';

export function AddComputerGroup() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <span className="flex justify-center gap-2">
            <span>Add computer group</span>
            <PlusIcon width={20} height={20} />
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Computer Group</DialogTitle>
        </DialogHeader>
        <CreateComputerGroupForm afterSubmit={() => setDialogOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
