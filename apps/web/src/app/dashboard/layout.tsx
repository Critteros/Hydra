import 'server-only';

import type { ReactNode } from 'react';

import { Users, Key, UserCog, Laptop2 as ComputerIcon, FilesIcon } from 'lucide-react';

import { AppBar } from '@/components/app-bar';
import { getClient } from '@/lib/server/apollo-client';
import { ServerClientBridge } from '@/lib/server/server-client-bridge';

import { CurrentUserProvider } from './current-user-context';
import { getCurrentUser } from './dashboard-queries';
import { SidebarNavigation, type SidebarGrouping } from './sidebar-nav';

const sidebarConfig: SidebarGrouping = {
  IAM: [
    {
      href: '/dashboard/users',
      icon: <Users size={16} />,
      title: 'Users',
    },
    {
      href: '/dashboard/roles',
      icon: <UserCog size={16} />,
      title: 'Roles',
    },
    {
      href: '/dashboard/permissions',
      icon: <Key size={16} />,
      title: 'Permissions',
    },
  ],
  IPXE: [
    {
      href: '/dashboard/ipxe/computers',
      icon: <ComputerIcon size={16} />,
      title: 'Computers',
    },
    {
      href: '/dashboard/ipxe/assets',
      icon: <FilesIcon size={16} />,
      title: 'IPXE Assets',
    },
  ],
};

export default async function DashboardLoayout({ children }: { children: ReactNode }) {
  const {
    data: { me: currentUser },
  } = await getClient().query({ query: getCurrentUser });
  return (
    <ServerClientBridge>
      <AppBar />
      <div className="container relative my-2 mb-5 flex h-full min-h-0 grow gap-4 pt-5">
        <SidebarNavigation items={sidebarConfig} />
        <CurrentUserProvider user={currentUser}>{children}</CurrentUserProvider>
      </div>
    </ServerClientBridge>
  );
}
