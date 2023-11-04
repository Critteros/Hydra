'use client';

import { useState } from 'react';

import { Users } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from '@/components/ui/dialog';

type EditUsersWidgetProps = {
  userCount: number;
  roleUid: string;
};
export function EditUsersWidget({ userCount, roleUid }: EditUsersWidgetProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Users className="mr-2 h-4 w-4" />
          <span>{userCount}</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Permissions</DialogTitle>
          <DialogDescription>Change assigned permissions and then click save</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
