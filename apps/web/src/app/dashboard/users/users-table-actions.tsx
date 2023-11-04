'use client';

import { useRouter } from 'next/navigation';

import { useState, useRef } from 'react';

import { useMutation } from '@apollo/client';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import type { Row } from '@tanstack/react-table';
import { ClipboardCopy, LogIn } from 'lucide-react';

import { AccountType } from '@/__generated__/graphql';
import { useCurrentUser } from '@/app/dashboard/current-user-context';
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

import { AdminChangePasswordAction } from './action-items/admin-change-password';
import { ChangePasswordAction } from './action-items/change-password';
import { EditAction } from './action-items/edit-action';
import { adminLoginAsUserMutation } from './mutations';
import type { User } from './queries';

type UsersTableActionsProps = {
  row: Row<User>;
};

export function UsersTableActions({ row }: UsersTableActionsProps) {
  const { refresh } = useRouter();
  const [adminLoginAs] = useMutation(adminLoginAsUserMutation);
  const currentUser = useCurrentUser();
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

  const ChangePasswordActionComponent =
    currentUser.accountType === AccountType.Admin
      ? AdminChangePasswordAction
      : ChangePasswordAction;

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
        <EditAction
          onOpenChange={handleDialogItemOpenChange}
          onSelect={handleDialogItemSelect}
          user={user}
        />
        {(currentUser.accountType === AccountType.Admin || currentUser.uid === user.uid) && (
          <ChangePasswordActionComponent
            onOpenChange={handleDialogItemOpenChange}
            onSelect={handleDialogItemSelect}
            user={user}
          />
        )}
        {currentUser.accountType === AccountType.Admin && currentUser?.uid !== user.uid && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={async () => {
                await adminLoginAs({ variables: { uid: user.uid } });
                refresh();
              }}
            >
              <LogIn className="mr-2 h-4 w-4" />
              <span>Login in as</span>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
