import type { ReactNode } from 'react';

import 'server-only';

import { Logo } from '@/components/logo';
import { ModeToggle } from '@/components/ui/mode-toggle';

export default function LoginLayout({ children }: { children: ReactNode }) {
  return (
    <main className="my-auto w-full self-center">
      <div className="absolute right-2 top-2">
        <ModeToggle />
      </div>
      <div className="absolute left-2 top-2">
        <Logo />
      </div>
      {children}
    </main>
  );
}
