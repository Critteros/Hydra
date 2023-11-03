import type { ComponentProps } from 'react';

import { PencilLine } from 'lucide-react';

import { DialogContent } from '@/components/ui/dialog';
import { DropdownDialogItem } from '@/components/ui/dropdown-menu';

type ChangePasswordActionProps = Pick<
  ComponentProps<typeof DropdownDialogItem>,
  'onSelect' | 'onOpenChange'
>;

export function EditAction(props: ChangePasswordActionProps) {
  return (
    <DropdownDialogItem
      dropdownItem={
        <>
          <PencilLine className="mr-2 h-4 w-4" />
          <span>Edit</span>
        </>
      }
      {...props}
    >
      <DialogContent>Edit</DialogContent>
    </DropdownDialogItem>
  );
}
