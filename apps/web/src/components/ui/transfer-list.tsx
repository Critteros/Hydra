'use client';

import { useState } from 'react';

import { Checkbox } from '@radix-ui/react-checkbox';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  DoubleArrowDownIcon,
  DoubleArrowUpIcon,
} from '@radix-ui/react-icons';

import { cn } from '@/lib/utils';

import { Button, buttonVariants } from './button';
import { ScrollArea } from './scroll-area';

type TransferListProps<TData extends { id: string | number; display: string }> = {
  className?: string;
  items: ReadonlyArray<TData>;
  selectedItems?: ReadonlyArray<string>;
  checkboxSelection?: string[];
  onCheckboxSelectionChange?: (selectedItems: Array<string | number>) => void;
  onConfirm: (selectedItems: ReadonlyArray<TData>) => unknown;
  unselectedTitle?: string;
  selectedTitle?: string;
};

export function TransferList<TData extends { id: string | number; display: string }>({
  className,
  items,
  selectedItems: selectedItemsProp = [],
  checkboxSelection: checkboxSelectionProp,
  onCheckboxSelectionChange,
  onConfirm,
  unselectedTitle = 'Available',
  selectedTitle = 'Selected',
}: TransferListProps<TData>) {
  const [selectedItems, setSelectedItems] = useState<Array<string | number>>(
    selectedItemsProp.slice(),
  );
  const [unselectedItems, setUnselectedItems] = useState<Array<string | number>>(
    items.map((item) => item.id.toString()).filter((item) => !selectedItemsProp.includes(item)),
  );
  const [checkboxSelectionOwnState, setCheckboxSelectionOwnState] = useState<
    Array<string | number>
  >([]);

  const checkboxSelection = checkboxSelectionProp ?? checkboxSelectionOwnState;
  const setCheckboxSelection = onCheckboxSelectionChange ?? setCheckboxSelectionOwnState;

  const getDisplayValue = (itemId: string | number) =>
    items.find((item) => item.id === itemId)?.display;

  const onItemSelect = (itemId: string | number) => {
    if (checkboxSelection.includes(itemId)) {
      setCheckboxSelection(checkboxSelection.filter((selectedItem) => selectedItem !== itemId));
    } else {
      setCheckboxSelection([...checkboxSelection, itemId]);
    }
  };

  const onMoveAllItems = (direction: 'up' | 'down') => {
    if (direction === 'up') {
      setUnselectedItems((prev) => [...prev, ...selectedItems]);
      setSelectedItems([]);
    } else {
      setSelectedItems((prev) => [...prev, ...unselectedItems]);
      setUnselectedItems([]);
    }
  };

  const isItemSelected = (itemId: string | number) => checkboxSelection.includes(itemId);

  const onMoveSelectedItems = (direction: 'up' | 'down') => {
    if (direction === 'up') {
      // Direction is "up"

      // Exclude the selected items from "lower" list (selectedItems)
      setSelectedItems((prev) => prev.filter((item) => !checkboxSelection.includes(item)));

      setUnselectedItems((prev) => {
        const newArray = [...prev, ...checkboxSelection];

        checkboxSelection.forEach((item) => {
          if (prev.includes(item)) {
            newArray.splice(newArray.lastIndexOf(item), 1);
          }
        });

        return newArray;
      });
    } else {
      // Direction is "down"

      // Exclude the selected items from "upper" list (unselectedItems)
      setUnselectedItems((prev) => prev.filter((item) => !checkboxSelection.includes(item)));

      setSelectedItems((prev) => {
        const newArray = [...prev, ...checkboxSelection];

        checkboxSelection.forEach((item) => {
          if (prev.includes(item)) {
            newArray.splice(newArray.lastIndexOf(item), 1);
          }
        });

        return newArray;
      });
    }
  };

  const handleConfirm = async () => {
    const selectedItemsData = items.filter((item) => selectedItems.includes(item.id.toString()));

    await onConfirm(selectedItemsData);
  };

  return (
    <div className={cn('', className)}>
      <div className="flex flex-col gap-2">
        <span className="pl-1 text-sm font-medium">{unselectedTitle}</span>
        <div className="flex flex-col">
          <div className="flex h-[200px] flex-col rounded-md border border-input">
            <ScrollArea>
              <div className="flex flex-col">
                {unselectedItems.map((itemId) => (
                  <div
                    key={itemId}
                    onClick={() => onItemSelect(itemId)}
                    onKeyDown={() => onItemSelect(itemId)}
                    role="button"
                    tabIndex={0}
                    onTouchStart={() => onItemSelect(itemId)}
                    className={cn(
                      buttonVariants({ variant: 'ghost' }),
                      'flex flex-row items-center justify-start gap-2',
                    )}
                  >
                    <Checkbox checked={isItemSelected(itemId)} />
                    <span>{getDisplayValue(itemId)}</span>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-center gap-2">
        <Button onClick={() => onMoveAllItems('down')} variant="outline" size="icon">
          <DoubleArrowDownIcon />
        </Button>
        <Button onClick={() => onMoveSelectedItems('down')} variant="outline" size="icon">
          <ArrowDownIcon />
        </Button>
        <Button onClick={() => onMoveSelectedItems('up')} variant="outline" size="icon">
          <ArrowUpIcon />
        </Button>
        <Button onClick={() => onMoveAllItems('up')} variant="outline" size="icon">
          <DoubleArrowUpIcon />
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        <span className="pl-1 text-sm font-medium">{selectedTitle}</span>
        <div className="flex flex-col">
          <div className="flex h-[200px] flex-col rounded-md border border-input">
            <ScrollArea>
              <div className="flex flex-col">
                {selectedItems.map((itemId) => (
                  <div
                    key={itemId}
                    onClick={() => onItemSelect(itemId)}
                    onKeyDown={() => onItemSelect(itemId)}
                    role="button"
                    tabIndex={0}
                    onTouchStart={() => onItemSelect(itemId)}
                    className={cn(
                      buttonVariants({ variant: 'ghost' }),
                      'flex flex-row items-center justify-start gap-2',
                    )}
                  >
                    <Checkbox checked={isItemSelected(itemId)} />
                    <span>{getDisplayValue(itemId)}</span>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
      <Button onClick={handleConfirm}>Save</Button>
    </div>
  );
}
