'use client';

import { useContext, createContext, type PropsWithChildren } from 'react';

import type { CurrentUser } from './queries';

const CurrentUserContext = createContext<CurrentUser | null>(null);

export function CurrentUserProvider({ user, children }: PropsWithChildren<{ user: CurrentUser }>) {
  return <CurrentUserContext.Provider value={user}>{children}</CurrentUserContext.Provider>;
}

export function useCurrentUser() {
  const user = useContext(CurrentUserContext);
  if (!user) throw new Error('useCurrentUser must be used within a CurrentUserProvider');
  return user;
}
