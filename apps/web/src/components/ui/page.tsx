import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

import { ScrollArea } from './scroll-area';
import { Typography } from './typography';

type PageProps = {
  children?: ReactNode;
  title: string;
  className?: string;
};

export function Page({ title, children, className }: PageProps) {
  return (
    <ScrollArea className="flex min-h-0 grow items-center justify-center">
      <main className={cn('flex grow flex-col  justify-center gap-10 px-4', className)}>
        <Typography variant="h1" className="mb-4 self-start">
          {title}
        </Typography>
        {children}
      </main>
    </ScrollArea>
  );
}
