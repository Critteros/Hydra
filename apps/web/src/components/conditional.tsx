import type { ReactNode } from 'react';

type ConditionalProps = {
  children: ReactNode;
  fallback?: ReactNode;
  condition: boolean;
};

export function Conditional({ children, fallback = <></>, condition }: ConditionalProps) {
  return condition ? <>{children}</> : <>{fallback}</>;
}
