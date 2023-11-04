'use client';

import { DialogTrigger } from '@radix-ui/react-dialog';
import { Cross2Icon, PlusIcon } from '@radix-ui/react-icons';
import type { Table } from '@tanstack/react-table';
import { UserCog2 as AdminIcon, User as UserIcon } from 'lucide-react';

import { AccountType } from '@/__generated__/graphql';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { DataTableFilter, type OptionsRender } from '@/components/ui/table/data-table-filter';
import { DataTableViewOptions } from '@/components/ui/table/data-table-view-options';

import { CreateUserForm } from './create-user-form';
import type { User } from './queries';

type UsersTableToorbarProps<TData> = {
  table: Table<TData>;
};

const accountTypes: Array<OptionsRender<User['accountType']>> = [
  {
    value: AccountType.Admin,
    label: 'Admin',
    icon: AdminIcon,
  },
  {
    value: AccountType.Standard,
    label: 'Standard',
    icon: UserIcon,
  },
];

export function UsersTableToolbar<TData>({ table }: UsersTableToorbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter using emails..."
          value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('email')?.setFilterValue(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn('accountType') && (
          <DataTableFilter
            column={table.getColumn('accountType')}
            title="Account Type"
            options={accountTypes}
          />
        )}

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
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="lg:px- h-8 px-2">
              <PlusIcon className="h-4 w-4" />
              <span className="ml-2">Add User</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add User</DialogTitle>
            </DialogHeader>
            <CreateUserForm />
          </DialogContent>
        </Dialog>
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
