'use client';

import { useRouter } from 'next/navigation';

import { useMutation } from '@apollo/client';
import type { Table } from '@tanstack/react-table';

import { DeleteButton } from '@/components/buttons/delete-button';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { useToast } from '@/components/ui/use-toast';
import { ClientPermissionBoundry } from '@/lib/client/client-permission-boundry';

import { DeleteAssetsMutation } from '../assets-mutations';
import type { IpxeAsset } from '../assets-queries';

type TableSelectionActions = {
  table: Table<IpxeAsset>;
};

export function TableSelectionActions({ table }: TableSelectionActions) {
  const [deleteMutlipleUsers] = useMutation(DeleteAssetsMutation);
  const { refresh } = useRouter();
  const { toast } = useToast();
  const filteredRows = table.getFilteredSelectedRowModel().rows;

  if (filteredRows.length === 0) {
    return <></>;
  }

  const onConfirm = async () => {
    const assetUids = filteredRows.map((row) => row.original.uid);
    const deletedCount = await deleteMutlipleUsers({
      variables: {
        where: assetUids.map((uid) => ({ uid })),
      },
    });
    toast({
      title: 'Assets deleted',
      description: `Successfully deleted ${deletedCount.data?.removeAssets} assets.`,
    });
    refresh();
  };

  return (
    <div className="flex">
      <ClientPermissionBoundry permission="ipxeAssets.delete" fallback={<></>}>
        <ConfirmDialog onConfirm={onConfirm}>
          <DeleteButton />
        </ConfirmDialog>
      </ClientPermissionBoundry>
    </div>
  );
}
