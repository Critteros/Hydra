import Link from 'next/link';

import type { ReactElement, HTMLAttributes } from 'react';

import 'server-only';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Typography } from '@/components/ui/typography';
import { cn } from '@/lib/utils';

import { SidebarItem } from './sidebar-item';

export type SiderbarElement = {
  title: string;
  href: string;
  icon: ReactElement;
};

export type SidebarGrouping = Record<string, SiderbarElement[]>;

type SidebarNavigationProps = {
  items: SidebarGrouping;
} & HTMLAttributes<HTMLElement>;

export function SidebarNavigation({ items, className, ...props }: SidebarNavigationProps) {
  const entries = Object.entries(items).map(
    ([title, entries]) =>
      ({
        groupTitle: title,
        members: entries,
        key: title,
      }) as const,
  );

  return (
    <ScrollArea className="flex min-h-0 grow-0 basis-[200px]">
      <nav
        className={cn('flex basis-[200px] flex-col items-start justify-start gap-5 p-2', className)}
        {...props}
      >
        {entries.map(({ groupTitle, members, key }) => (
          <div key={key} className="flex w-full flex-col gap-4">
            <div className="flex flex-col gap-3">
              <Typography variant="h4" className="mb-1 text-sm">
                {groupTitle}
              </Typography>
              {members.map(({ title, href, icon }) => (
                <SidebarItem key={`${groupTitle}-${title}-${href}`} target={href}>
                  <Link
                    key={`${groupTitle}-${title}-${href}`}
                    href={href}
                    className="flex flex-row items-center justify-start gap-1 text-sm first-letter:capitalize hover:underline"
                  >
                    {icon}
                    {title}
                  </Link>
                </SidebarItem>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </ScrollArea>
  );
}
