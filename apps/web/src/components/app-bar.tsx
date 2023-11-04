import Link from 'next/link';

import type { Session } from '@hydra-ipxe/common/schemas/auth';
import 'server-only';

import { Logo } from '@/components/logo';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { sessionEndpoint, sessionCookieName, extractSessionCookie } from '@/lib/server/auth';

import { LogoutMenuItem } from './fragments/app-bar/logout-item';

export async function AppBar() {
  const resp = await fetch(sessionEndpoint, {
    cache: 'no-store',
    headers: {
      cookie: `${sessionCookieName}=${extractSessionCookie()}`,
    },
  });
  const { email, name } = (await resp.json()) as Session;
  const letter = (name?.[0] ?? email[0] ?? '?').toUpperCase();

  return (
    <header className="flex w-full grow-0 flex-row border-b p-2">
      <div className="container mr-auto flex h-12 items-center">
        <div className="mr-auto">
          <Link href="/" replace>
            <Logo />
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3">
            <b>{email}</b>
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarFallback>{letter}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <LogoutMenuItem />
            </DropdownMenuContent>
          </DropdownMenu>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
