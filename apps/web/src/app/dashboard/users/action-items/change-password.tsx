import type { ComponentProps } from 'react';

import { KeyRound } from 'lucide-react';

import { DialogContent } from '@/components/ui/dialog';
import { DropdownDialogItem } from '@/components/ui/dropdown-menu';

type ChangePasswordActionProps = Pick<
  ComponentProps<typeof DropdownDialogItem>,
  'onSelect' | 'onOpenChange'
>;

export function ChangePasswordAction(props: ChangePasswordActionProps) {
  return (
    <DropdownDialogItem
      dropdownItem={
        <>
          <KeyRound className="mr-2 h-4 w-4" />
          <span>Change password</span>
        </>
      }
      {...props}
    >
      <DialogContent>Change password</DialogContent>
    </DropdownDialogItem>
  );
}
