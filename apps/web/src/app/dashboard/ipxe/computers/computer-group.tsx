'use client';

// It has to be imported this way as it seems like babel is creashing when
// only ComputerGroup is imported.
import { useState, type ReactNode } from 'react';

import type * as GQLTypes from '$gql/types';
import { ChevronUpIcon, ChevronDownIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { TableCell } from '@/components/ui/table';
import { cn } from '@/lib/utils';

type ComputerGroupProps = { children: ReactNode } & Pick<GQLTypes.ComputerGroup, 'name'>;

export function ComputerGroup({ name, children }: ComputerGroupProps) {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible open={open} onOpenChange={setOpen} asChild>
      <tr>
        <TableCell colSpan={9999} className={cn('px-0', open && 'border-b-2 border-l-2')}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className={cn('flex w-full gap-2', open && 'border-b-2')}>
              <span className="font-bold">{name}</span>
              {open ? (
                <ChevronUpIcon width={20} height={20} />
              ) : (
                <ChevronDownIcon width={20} height={20} />
              )}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div>{children}</div>
          </CollapsibleContent>
        </TableCell>
      </tr>
    </Collapsible>
  );
}
