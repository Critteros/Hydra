'use client';

import { useRouter } from 'next/navigation';

import { useMutation } from '@apollo/client';
import type { Table } from '@tanstack/react-table';

import { DeleteButton } from '@/components/buttons/delete-button';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { useToast } from '@/components/ui/use-toast';
import { ClientPermissiosnBoundry } from '@/lib/client/client-permission-boundry';

import { deleteMultipleRolesMutation } from './roles-mutations';
import type { RolePresentation } from './roles-queries';

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
      <ClientPermissiosnBoundry permission="roles.delete" fallback={<></>}>
        <ConfirmDialog onConfirm={onConfirm}>
          <DeleteButton />
        </ConfirmDialog>
      </ClientPermissiosnBoundry>
    </div>
  );
}
