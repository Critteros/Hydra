import { forwardRef } from 'react';

import { Plus } from 'lucide-react';

import { Button, type ButtonProps } from '../ui/button';

type EditButtonProps = Omit<ButtonProps, 'variant' | 'size' | 'asChild'> & {
  icon?: boolean;
};

export const CreateButton = forwardRef<HTMLButtonElement, EditButtonProps>(
  ({ icon, children, ...props }, ref) => {
    if (icon) {
      return (
        <Button ref={ref} variant="outline" size="icon" {...props}>
          <Plus className="h-4 w-4" />
        </Button>
      );
    }

    return (
      <Button ref={ref} variant="outline" size="sm" {...props}>
        <Plus className="mr-2 h-4 w-4" />
        <span className="ml-1">{children ?? 'Create'}</span>
      </Button>
    );
  },
);
CreateButton.displayName = 'DeleteButton';
