'use client';

import { useRouter } from 'next/navigation';

import type { ReactNode, ComponentProps } from 'react';

import { useMutation } from '@apollo/client';
import { DragDropContext } from '@hello-pangea/dnd';

import { moveComputerAndUpdateOrderMutation } from './computer-mutations';

export const UNGROUPED_COMPUTERS = 'ungrouped';

type DragContextProps = {
  children: ReactNode;
};

export function DragContext({ children }: DragContextProps) {
  const [moveComputer] = useMutation(moveComputerAndUpdateOrderMutation);
  const { refresh } = useRouter();

  const onDropEnd: ComponentProps<typeof DragDropContext>['onDragEnd'] = async ({
    draggableId: computerUid,
    destination,
  }) => {
    const destinationGroupUid =
      destination?.droppableId === UNGROUPED_COMPUTERS ? null : destination?.droppableId ?? null;

    console.log(destination?.index);

    await moveComputer({
      variables: {
        computerUid,
        groupUid: destinationGroupUid,
        order: destination?.index ?? 0,
      },
    });
    refresh();
  };
  return <DragDropContext onDragEnd={onDropEnd}>{children}</DragDropContext>;
}
