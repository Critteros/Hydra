import { Trash2 } from 'lucide-react';

import { Button, type ButtonProps } from '../ui/button';

type DeleteButtonProps = Omit<ButtonProps, 'variant' | 'size' | 'children' | 'asChild'> & {
  icon?: boolean;
};

export function DeleteButton({ icon, ...props }: DeleteButtonProps) {
  if (icon) {
    return (
      <Button variant="destructive" size="icon" {...props}>
        <Trash2 className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <Button variant="destructive" size="sm" {...props}>
      <Trash2 className="mr-2 h-4 w-4" />
      <span className="ml-1">Delete</span>
    </Button>
  );
}
