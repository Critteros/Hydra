'use client';

import { useRouter } from 'next/navigation';

import { useState, useEffect } from 'react';

import { useMutation, useQuery } from '@apollo/client';
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
import { Skeleton } from '@/components/ui/skeleton';
import { TransferList } from '@/components/ui/transfer-list';
import { useToast } from '@/components/ui/use-toast';

import { assignUsersToRoleMutation } from './mutations';
import { queryRoleMembers } from './roles-queries';

type EditUsersWidgetProps = {
  userCount: number;
  roleUid: string;
};
export function EditUsersWidget({ userCount, roleUid }: EditUsersWidgetProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const { refetch: refetchRoleMembers, data } = useQuery(queryRoleMembers, {
    variables: {
      uid: roleUid,
    },
  });
  const [assignUsersToRole] = useMutation(assignUsersToRoleMutation);
  const { refresh } = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (dialogOpen) {
      setSelectedItems([]);
    }
  }, [dialogOpen]);

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
        {data ? (
          <TransferList
            items={data.users.map(({ uid, email }) => ({ id: uid, display: email }))}
            selectedItems={data.role.members.map(({ uid }) => uid)}
            checkboxSelection={selectedItems}
            onCheckboxSelectionChange={setSelectedItems}
            onConfirm={async (items) => {
              await assignUsersToRole({
                variables: {
                  roleUid,
                  usersUids: items.map((item) => item.id),
                },
              });
              refresh();
              toast({
                title: 'Users updated',
                description: 'User assignment have been updated',
              });
              await refetchRoleMembers();
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
