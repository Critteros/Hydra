'use client';

import { useRouter } from 'next/navigation';

export function useHistory() {
  const router = useRouter();
  const historyLength = typeof window !== 'undefined' ? window.history.length : 0;

  const backOrDefault = (defaultUrl: string) => {
    if (historyLength > 1) {
      router.push(defaultUrl);
    } else {
      router.back();
    }
  };

  return {
    push: (url: string) => router.push(url),
    replace: (url: string) => router.replace(url),
    back: () => router.back(),
    forward: () => router.forward(),
    historyLength,
    backOrDefault,
    refresh: () => router.refresh(),
  } as const;
}
