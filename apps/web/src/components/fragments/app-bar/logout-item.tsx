'use client';

import { LogOut } from 'lucide-react';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useHistory } from '@/lib/client/hooks/history';

export function LogoutMenuItem() {
  const { refresh } = useHistory();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', {
      method: 'POST',
    });
    refresh();
  };

  return (
    <DropdownMenuItem onClick={handleLogout}>
      <span className="flex w-full flex-row items-center gap-4">
        <LogOut width={18} height={18} />
        <span>Logout</span>
      </span>
    </DropdownMenuItem>
  );
}
