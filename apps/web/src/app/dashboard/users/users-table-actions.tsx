'use client';

import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import type { Row } from '@tanstack/react-table';
import { PencilLine, ClipboardCopy } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/components/ui/use-toast';

import type { User } from './queries';

type UsersTableActionsProps = {
  row: Row<User>;
};

export function UsersTableActions({ row }: UsersTableActionsProps) {
  const { toast } = useToast();

  const user = row.original;

  const onCopyToClipboard = (field: keyof User) => async () => {
    const value = user[field];
    if (!value) return;
    await navigator.clipboard.writeText(value);
    toast({
      title: 'Copied',
      description: `The ${field} has been copied to the clipboard`,
    });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <PencilLine className="mr-2 h-4 w-4" />
          <span>Edit</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onCopyToClipboard('uid')}>
          <ClipboardCopy className="mr-2 h-4 w-4" />
          <span>Copy UID</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
