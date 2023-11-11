import { Trash2 } from 'lucide-react';

import { Button, type ButtonProps } from '../ui/button';

type DeleteButtonProps = Omit<ButtonProps, 'variant' | 'size' | 'children' | 'asChild'>;

export function DeleteButton(props: DeleteButtonProps) {
  return (
    <Button variant="destructive" size="sm" {...props}>
      <Trash2 className="mr-2 h-4 w-4" />
      <span className="ml-1">Delete</span>
    </Button>
  );
}
