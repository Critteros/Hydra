import type { ReactNode } from 'react';

import 'server-only';

import { AppBar } from '@/components/app-bar';

export default function DashboardLoayout({ children }: { children: ReactNode }) {
  return (
    <>
      <AppBar />
      {children}
    </>
  );
}
