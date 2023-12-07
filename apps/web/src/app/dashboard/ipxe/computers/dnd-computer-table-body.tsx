'use client';

import { forwardRef, type HTMLAttributes, cloneElement, type ReactElement, type Ref } from 'react';

import type { Computer } from '$gql/types';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import { createPortal } from 'react-dom';

import { TableRow, TableCell, TableBody, Table } from '@/components/ui/table';
import { ClientPermissionBoundry } from '@/lib/client/client-permission-boundry';
import { usePermissions } from '@/lib/client/hooks/permissions';
import { cn } from '@/lib/utils';

import { AddComputer } from './add-computer';
import { DeleteComputer } from './delete-computer';
import { UNGROUPED_COMPUTERS } from './drag-context';

type DnDComputerTableBodyProps = {
  tableData: Array<Pick<Computer, 'ipv4' | 'mac' | 'name'> & { key: string }>;
  groupUid?: string;
};

const DraggerHandler = forwardRef<
  unknown,
  HTMLAttributes<HTMLElement> & { isDragging: boolean; children: ReactElement }
>(({ children, isDragging, ...other }, ref) => {
  if (!isDragging) return <>{cloneElement(children, { ...other, ref })}</>;

  const node = (
    <Table {...other} ref={ref as Ref<HTMLTableElement>}>
      <TableBody>{children}</TableBody>
    </Table>
  );

  return createPortal(node, document.body);
});
DraggerHandler.displayName = 'DraggerHandler';

export function DnDComputerTableBody({ tableData, groupUid }: DnDComputerTableBodyProps) {
  const { hasPermission } = usePermissions();

  return (
    <Droppable
      droppableId={groupUid ?? UNGROUPED_COMPUTERS}
      isDropDisabled={!hasPermission('computers.edit')}
    >
      {(provided) => (
        <TableBody {...provided.droppableProps} ref={provided.innerRef}>
          {tableData.map(({ key, ipv4, mac, name }, index) => (
            <Draggable
              key={key}
              draggableId={key}
              index={index}
              isDragDisabled={!hasPermission('computers.edit')}
            >
              {(provided, { isDragging }) => (
                <DraggerHandler
                  isDragging={isDragging}
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <TableRow className={cn(isDragging && 'table-row outline outline-red-500')}>
                    <TableCell>{name}</TableCell>
                    <TableCell>
                      {ipv4 ?? <p className="text-muted-foreground">{'<not set>'}</p>}
                    </TableCell>
                    <TableCell>{mac}</TableCell>
                    <ClientPermissionBoundry permission="computers.delete" fallback={<></>}>
                      <TableCell className="w-10">
                        <DeleteComputer computerUid={key} />
                      </TableCell>
                    </ClientPermissionBoundry>
                  </TableRow>
                </DraggerHandler>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
          <ClientPermissionBoundry permission="computers.create" fallback={<></>}>
            <AddComputer groupUid={groupUid}>Add Computer</AddComputer>
          </ClientPermissionBoundry>
        </TableBody>
      )}
    </Droppable>
  );
}
