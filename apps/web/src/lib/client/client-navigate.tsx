'use client';

import { useEffect } from 'react';

import { useHistory } from './hooks/history';

export function ClientNavigateBack({
  defaultUrl,
  timeout,
}: {
  defaultUrl: string;
  timeout?: number;
}) {
  const { backOrDefault } = useHistory();

  useEffect(() => {
    const timeoutHandle = setTimeout(() => backOrDefault(defaultUrl), timeout ?? 0);

    return () => clearTimeout(timeoutHandle);
  });

  return <></>;
}
