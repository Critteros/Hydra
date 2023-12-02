'use client';

// It has to be imported this way as it seems like babel is creashing when
// only ComputerGroup is imported.
import { useState, type ReactNode } from 'react';

import type * as GQLTypes from '$gql/types';
import { ChevronUpIcon, ChevronDownIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { TableCell } from '@/components/ui/table';
import { Typography } from '@/components/ui/typography';
import { cn } from '@/lib/utils';

import { DeleteGroup } from './delete-group';

type ComputerGroupProps = { children: ReactNode; groupUid: string } & Pick<
  GQLTypes.ComputerGroup,
  'name'
>;

export function ComputerGroup({ name, children, groupUid }: ComputerGroupProps) {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible open={open} onOpenChange={setOpen} asChild>
      <tr>
        <TableCell colSpan={9999} className={cn('px-0', open && 'border-b-2 border-l-2')}>
          <CollapsibleTrigger asChild>
            <span className={cn('flex w-full rounded-md p-2', !open && 'border-2')}>
              <Button
                variant="ghost"
                className={cn(
                  'flex w-full justify-center gap-2 py-5',
                  open && 'mb-5 border-b-2 pb-8',
                )}
              >
                <Typography variant="h3">{name}</Typography>
                {open ? (
                  <ChevronUpIcon width={20} height={20} />
                ) : (
                  <ChevronDownIcon width={20} height={20} />
                )}
              </Button>
              <span className="mr-4">
                <DeleteGroup groupUid={groupUid} />
              </span>
            </span>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div>{children}</div>
          </CollapsibleContent>
        </TableCell>
      </tr>
    </Collapsible>
  );
}
