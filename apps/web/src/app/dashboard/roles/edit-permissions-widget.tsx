'use client';

import { useRouter } from 'next/navigation';

import { useState, useEffect } from 'react';

import { useMutation, useQuery } from '@apollo/client';
import type { Permissions } from '@hydra-ipxe/common/shared/permissions';
import {
  ArrowDownIcon,
  DoubleArrowDownIcon,
  ArrowUpIcon,
  DoubleArrowUpIcon,
} from '@radix-ui/react-icons';
import { Key } from 'lucide-react';

import { Button, buttonVariants } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

import { assignPermissionsToRoleMutation } from './mutations';
import { queryRolePermissions } from './queries';

type EditPermissionsWidgetProps = {
  permissionCount: number;
  roleUid: string;
};
export function EditPermissionsWidget({ permissionCount, roleUid }: EditPermissionsWidgetProps) {
  const { refresh } = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();
  const [allPermissions, setAllPermissions] = useState<Array<Permissions>>([]);
  const [selectedPermissions, setSelectedPermissions] = useState<Array<Permissions>>([]);
  const [selectedItems, setSelectedItems] = useState<Array<Permissions>>([]);
  const [assignPermissionsToRole] = useMutation(assignPermissionsToRoleMutation);

  const { refetch: refetchRolePermissions } = useQuery(queryRolePermissions, {
    skip: !dialogOpen,
    variables: {
      uid: roleUid,
    },
    onCompleted: (data) => {
      const selectedPerms = data.role.permissions.map((permission) => permission.id as Permissions);
      setSelectedPermissions(selectedPerms);

      const allPerms = data.permissions.map((permission) => permission.id as Permissions);
      setAllPermissions(allPerms.filter((permission) => !selectedPerms.includes(permission)));
    },
  });

  useEffect(() => {
    if (dialogOpen) {
      setSelectedItems([]);
    }
  }, [dialogOpen]);

  const onItemSelect = (item: Permissions) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((selectedItem) => selectedItem !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const isItemSelected = (item: Permissions) => selectedItems.includes(item);
  const onMoveSelectedItems = (direction: 'up' | 'down') => {
    if (direction === 'up') {
      // Direction is "up"

      // Exclude the selected items from "lower" list (selectedPermissions)
      setSelectedPermissions((prev) => prev.filter((item) => !selectedItems.includes(item)));

      setAllPermissions((prev) => {
        const newArray = [...prev, ...selectedItems];

        selectedItems.forEach((item) => {
          if (prev.includes(item)) {
            newArray.splice(newArray.lastIndexOf(item), 1);
          }
        });

        return newArray;
      });
    } else {
      // Direction is "down"

      // Exclude the selected items from "upper" list (allPermissions
      setAllPermissions((prev) => prev.filter((item) => !selectedItems.includes(item)));

      setSelectedPermissions((prev) => {
        const newArray = [...prev, ...selectedItems];

        selectedItems.forEach((item) => {
          if (prev.includes(item)) {
            newArray.splice(newArray.lastIndexOf(item), 1);
          }
        });

        return newArray;
      });
    }
  };

  const onMoveAllItems = (direction: 'up' | 'down') => {
    if (direction === 'up') {
      setAllPermissions((prev) => [...prev, ...selectedPermissions]);
      setSelectedPermissions([]);
    } else {
      setSelectedPermissions((prev) => [...prev, ...allPermissions]);
      setAllPermissions([]);
    }
  };

  const onConfirm = async () => {
    await assignPermissionsToRole({
      variables: {
        roleUid: roleUid,
        permissionIds: selectedPermissions,
      },
    });
    refresh();
    toast({
      title: 'Permissions updated',
      description: 'Permissions have been updated',
    });
    await refetchRolePermissions();
  };

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
        <div className="flex flex-col gap-2">
          <span className="pl-1 text-sm font-medium">Available permissions</span>
          <div className="flex flex-col">
            <div className="flex h-[200px] flex-col rounded-md border border-input">
              <ScrollArea>
                <div className="flex flex-col">
                  {allPermissions.map((permission) => (
                    <div
                      key={permission}
                      onClick={() => onItemSelect(permission)}
                      onKeyDown={() => onItemSelect(permission)}
                      role="button"
                      tabIndex={0}
                      onTouchStart={() => onItemSelect(permission)}
                      className={cn(
                        buttonVariants({ variant: 'ghost' }),
                        'flex flex-row items-center justify-start gap-2',
                      )}
                    >
                      <Checkbox checked={isItemSelected(permission)} />
                      <span>{permission}</span>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-center gap-2">
          <Button onClick={() => onMoveAllItems('down')} variant="outline" size="icon">
            <DoubleArrowDownIcon />
          </Button>
          <Button onClick={() => onMoveSelectedItems('down')} variant="outline" size="icon">
            <ArrowDownIcon />
          </Button>
          <Button onClick={() => onMoveSelectedItems('up')} variant="outline" size="icon">
            <ArrowUpIcon />
          </Button>
          <Button onClick={() => onMoveAllItems('up')} variant="outline" size="icon">
            <DoubleArrowUpIcon />
          </Button>
        </div>
        <div className="flex flex-col gap-2">
          <span className="pl-1 text-sm font-medium">Selected permissions</span>
          <div className="flex flex-col">
            <div className="flex h-[200px] flex-col rounded-md border border-input">
              <ScrollArea>
                <div className="flex flex-col">
                  {selectedPermissions.map((permission) => (
                    <div
                      key={permission}
                      onClick={() => onItemSelect(permission)}
                      onKeyDown={() => onItemSelect(permission)}
                      role="button"
                      tabIndex={0}
                      onTouchStart={() => onItemSelect(permission)}
                      className={cn(
                        buttonVariants({ variant: 'ghost' }),
                        'flex flex-row items-center justify-start gap-2',
                      )}
                    >
                      <Checkbox checked={isItemSelected(permission)} />
                      <span>{permission}</span>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
        <Button onClick={onConfirm}>Save</Button>
      </DialogContent>
    </Dialog>
  );
}
