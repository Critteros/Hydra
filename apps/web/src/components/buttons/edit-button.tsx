import { forwardRef } from 'react';

import { Edit } from 'lucide-react';

import { Button, type ButtonProps } from '../ui/button';

type EditButtonProps = Omit<ButtonProps, 'variant' | 'size' | 'children' | 'asChild'> & {
  icon?: boolean;
};

export const EditButton = forwardRef<HTMLButtonElement, EditButtonProps>(
  ({ icon, ...props }, ref) => {
    if (icon) {
      return (
        <Button ref={ref} variant="outline" size="icon" {...props}>
          <Edit className="h-4 w-4" />
        </Button>
      );
    }

    return (
      <Button ref={ref} variant="outline" size="sm" {...props}>
        <Edit className="mr-2 h-4 w-4" />
        <span className="ml-1">Edit</span>
      </Button>
    );
  },
);
EditButton.displayName = 'DeleteButton';
