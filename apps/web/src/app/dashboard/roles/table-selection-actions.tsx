'use client';

import { useRouter } from 'next/navigation';

import { useMutation } from '@apollo/client';
import type { Table } from '@tanstack/react-table';
import { Trash2 } from 'lucide-react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button, buttonVariants } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

import { deleteMultipleRolesMutation } from './mutations';
import type { RolePresentation } from './queries';

type TableSelectionActions = {
  table: Table<RolePresentation>;
};
export function TableSelectionActions({ table }: TableSelectionActions) {
  const [deleteMultipleRoles] = useMutation(deleteMultipleRolesMutation);
  const { refresh } = useRouter();
  const { toast } = useToast();
  const filteredRows = table.getFilteredSelectedRowModel().rows;

  if (filteredRows.length === 0) {
    return <></>;
  }

  const onConfirm = async () => {
    const roleIds = filteredRows.map((row) => row.original.uid);
    const deletedCount = await deleteMultipleRoles({
      variables: {
        uids: roleIds,
      },
    });
    toast({
      title: 'Roles deleted',
      description: `Successfully deleted ${deletedCount.data?.deleteMultipleRoles} roles.`,
    });
    refresh();
  };

  return (
    <div className="flex">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" size="sm">
            <Trash2 className="mr-2 h-4 w-4" />
            <span className="ml-1">Delete</span>
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the selected roles.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={onConfirm}
              className={buttonVariants({ variant: 'destructive' })}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
