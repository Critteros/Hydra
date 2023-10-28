'use client';

import { useCallback } from 'react';

import Cookie from 'js-cookie';
import { useTheme as useNextTheme } from 'next-themes';

export function useTheme(): ReturnType<typeof useNextTheme> {
  const { setTheme: setNextTheme, ...rest } = useNextTheme();

  const setTheme = useCallback(
    (...args: Parameters<typeof setNextTheme>) => {
      const [theme, ...rest] = args;
      setNextTheme(theme, ...rest);
      Cookie.set('theme', theme);
    },
    [setNextTheme],
  );

  return {
    setTheme,
    ...rest,
  };
}
