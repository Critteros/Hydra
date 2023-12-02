import { forwardRef } from 'react';

import { Trash2 } from 'lucide-react';

import { Button, type ButtonProps } from '../ui/button';

type DeleteButtonProps = Omit<ButtonProps, 'variant' | 'size' | 'children' | 'asChild'> & {
  icon?: boolean;
};

export const DeleteButton = forwardRef<HTMLButtonElement, DeleteButtonProps>(
  ({ icon, ...props }, ref) => {
    if (icon) {
      return (
        <Button ref={ref} variant="destructive" size="icon" {...props}>
          <Trash2 className="h-4 w-4" />
        </Button>
      );
    }

    return (
      <Button ref={ref} variant="destructive" size="sm" {...props}>
        <Trash2 className="mr-2 h-4 w-4" />
        <span className="ml-1">Delete</span>
      </Button>
    );
  },
);
DeleteButton.displayName = 'DeleteButton';
