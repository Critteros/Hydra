'use client';

import { useState, useRef, type ReactNode } from 'react';

import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import type { Row } from '@tanstack/react-table';
import { PencilLine, ClipboardCopy, KeyRound } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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
type DialogItemProps = {
  trigger: ReactNode;
  onSelect: () => void;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
};
function DialogItem({ trigger, onSelect, onOpenChange, children }: DialogItemProps) {
  return (
    <Dialog onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <DropdownMenuItem
          onSelect={(event) => {
            event.preventDefault();
            onSelect?.();
          }}
        >
          {trigger}
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}
export function UsersTableActions({ row }: UsersTableActionsProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hasOpenDialog, setHasOpenDialog] = useState(false);
  const dropdownTriggerRef = useRef<HTMLButtonElement>(null);
  const focusRef = useRef<HTMLElement | null>(null);
  const { toast } = useToast();

  const handleDialogItemSelect = () => {
    focusRef.current = dropdownTriggerRef.current;
  };
  const handleDialogItemOpenChange = (open: boolean) => {
    setHasOpenDialog(open);
    if (open === false) {
      setDropdownOpen(false);
    }
  };

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
    <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          ref={dropdownTriggerRef}
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        hidden={hasOpenDialog}
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          if (focusRef.current) {
            focusRef.current?.focus();
            focusRef.current = null;
          }
        }}
      >
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onCopyToClipboard('uid')}>
          <ClipboardCopy className="mr-2 h-4 w-4" />
          <span>Copy UID</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <PencilLine className="mr-2 h-4 w-4" />
          <span>Edit</span>
        </DropdownMenuItem>
        <DialogItem
          trigger={
            <>
              <KeyRound className="mr-2 h-4 w-4" />
              <span>Change password</span>
            </>
          }
          onSelect={handleDialogItemSelect}
          onOpenChange={handleDialogItemOpenChange}
        >
          ttt
        </DialogItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
