'use client';

import type { ReactNode, ComponentProps } from 'react';

import { DragDropContext } from '@hello-pangea/dnd';

export const UNGROUPED_COMPUTERS = 'ungrouped';

type DragContextProps = {
  children: ReactNode;
};

export function DragContext({ children }: DragContextProps) {
  const onDropEnd: ComponentProps<typeof DragDropContext>['onDragEnd'] = (result) => {
    console.log(result);
  };
  return <DragDropContext onDragEnd={onDropEnd}>{children}</DragDropContext>;
}
