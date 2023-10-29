'use client';

import { usePathname } from 'next/navigation';

import { type ReactElement, cloneElement } from 'react';

import { cn } from '@/lib/utils';

type SidebarItemProps = {
  children: ReactElement;
  target: string;
};

export function SidebarItem({ children, target }: SidebarItemProps) {
  const pathname = usePathname();

  return cloneElement(children, {
    className: cn(
      (children.props as { className: unknown }).className ?? '',
      pathname === target ? 'font-medium text-foreground' : 'text-muted-foreground',
    ),
  });
}
