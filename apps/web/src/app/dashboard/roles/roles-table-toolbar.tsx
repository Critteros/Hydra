'use client';

import { useState } from 'react';

import { useMutation } from '@apollo/client';
import { Cross2Icon, PlusIcon } from '@radix-ui/react-icons';
import type { Table } from '@tanstack/react-table';

import { AccountType } from '@/__generated__/graphql';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { DataTableViewOptions } from '@/components/ui/table/data-table-view-options';

import { useCurrentUser } from '../current-user-context';

import { RoleModifyForm, type FormSchema } from './role-modify-form';
import { createRoleMutation } from './roles-mutations';

type RolesTableToorbarProps<TData> = {
  table: Table<TData>;
};

export function RolesTableToolbar<TData>({ table }: RolesTableToorbarProps<TData>) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [addNewRole] = useMutation(createRoleMutation);
  const currentUser = useCurrentUser();
  const isFiltered = table.getState().columnFilters.length > 0;

  const addNewRoleMutation = async (values: FormSchema) => {
    await addNewRole({
      variables: {
        input: {
          ...values,
        },
      },
    });
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter using names..."
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex gap-2">
        {currentUser.accountType === AccountType.Admin && (
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="lg:px- h-8 px-2">
                <PlusIcon className="h-4 w-4" />
                <span className="ml-2">Add Role</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add new role</DialogTitle>
              </DialogHeader>
              <RoleModifyForm
                mutate={addNewRoleMutation}
                closeDialog={() => setDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>
        )}
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
