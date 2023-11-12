'use client';

import { useRouter } from 'next/navigation';

import { useState, useEffect } from 'react';

import { useMutation, useQuery } from '@apollo/client';
import { Key } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { TransferList } from '@/components/ui/transfer-list';
import { useToast } from '@/components/ui/use-toast';

import { assignPermissionsToRoleMutation } from './roles-mutations';
import { queryRolePermissions } from './roles-queries';

type EditPermissionsWidgetProps = {
  permissionCount: number;
  roleUid: string;
};
export function EditPermissionsWidget({ permissionCount, roleUid }: EditPermissionsWidgetProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [assignPermissionsToRole] = useMutation(assignPermissionsToRoleMutation);
  const { refresh } = useRouter();
  const { toast } = useToast();

  const { refetch: refetchRolePermissions, data } = useQuery(queryRolePermissions, {
    variables: {
      uid: roleUid,
    },
  });

  useEffect(() => {
    if (dialogOpen) {
      setSelectedItems([]);
    }
  }, [dialogOpen]);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Key className="mr-2 h-4 w-4" />
          <span>{permissionCount}</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Permissions</DialogTitle>
          <DialogDescription>Change assigned permissions and then click save</DialogDescription>
        </DialogHeader>
        {data ? (
          <TransferList
            items={data.permissions.map((permission) => ({
              id: permission.id,
              display: permission.id,
            }))}
            selectedItems={data?.role?.permissions.map((permission) => permission.id)}
            checkboxSelection={selectedItems}
            onCheckboxSelectionChange={setSelectedItems}
            onConfirm={async (items) => {
              await assignPermissionsToRole({
                variables: {
                  roleUid: roleUid,
                  permissionIds: items.map((item) => item.id),
                },
              });
              refresh();
              toast({
                title: 'Permissions updated',
                description: 'Permissions have been updated',
              });
              await refetchRolePermissions();
              setDialogOpen(false);
            }}
          />
        ) : (
          <div className="flex flex-col">
            <Skeleton className="h-[200px] w-full" />
            <Skeleton className="h-[50px] w-full" />
            <Skeleton className="h-[200px] w-full" />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
