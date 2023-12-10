'use client';

// It has to be imported this way as it seems like babel is creashing when
// only ComputerGroup is imported.
import { useState, type ReactNode } from 'react';

// For some reason prettier is crashing if this is done in normal way
import type * as GQLTypes from '$gql/types';
import { ChevronUpIcon, ChevronDownIcon } from '@radix-ui/react-icons';
import type { PickDeep } from 'type-fest';

import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { TableCell } from '@/components/ui/table';
import { Typography } from '@/components/ui/typography';
import { ClientPermissionBoundry } from '@/lib/client/client-permission-boundry';
import { cn } from '@/lib/utils';

import { ComputerGroupStrategySelector } from './computer-group-strategy-selector';
import { DeleteGroup } from './delete-group';
import { ReadonlyStrategyView } from './fallbacks/readonly-strategy-view';

type ComputerGroupProps = {
  children: ReactNode;
  groupUid: string;
  strategies: Array<Pick<GQLTypes.IpxeStrategy, 'name' | 'uid'>>;
} & PickDeep<GQLTypes.ComputerGroup, 'name' | 'strategy.uid' | 'strategy.name'>;

export function ComputerGroup({
  name,
  children,
  groupUid,
  strategy,
  strategies,
}: ComputerGroupProps) {
  const [open, setOpen] = useState(false);
  // TODO: FIX STYLING, this component is a mess
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
                <span className="relative left-[150px] flex flex-row items-center gap-2">
                  <Typography variant="h3">{name}</Typography>
                  {open ? (
                    <ChevronUpIcon width={20} height={20} />
                  ) : (
                    <ChevronDownIcon width={20} height={20} />
                  )}
                </span>
              </Button>
              <div className={cn('flex flex-row gap-[40px]', open && 'mb-5 ml-[-3px] border-b-2')}>
                <div className="flex w-[260px] flex-col items-start justify-start px-[50px]">
                  <ClientPermissionBoundry
                    permission="ipxeStrategy.apply"
                    fallback={
                      <span className="inline-flex items-center justify-center pt-[10px]">
                        <ReadonlyStrategyView strategy={strategy} />
                      </span>
                    }
                  >
                    <ComputerGroupStrategySelector
                      computerGroupUid={groupUid}
                      strategies={strategies}
                      strategy={strategy}
                    />
                  </ClientPermissionBoundry>
                </div>
                <span className="shrink-0">
                  <DeleteGroup groupUid={groupUid} />
                </span>
              </div>
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
