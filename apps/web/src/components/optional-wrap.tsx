import type { ComponentType, ReactNode } from 'react';

type OptionalWrapProps<ComponentProps> = {
  children: ReactNode;
  wrapper: ComponentType<ComponentProps>;
  wrapperProps?: ComponentProps;
  condition: boolean;
};

export function OptionalWrap<ComponentProps>({
  children,
  wrapper,
  wrapperProps,
  condition,
}: OptionalWrapProps<ComponentProps>) {
  if (!condition) return <>{children}</>;

  const Wrapper = wrapper;

  // @ts-expect-error TOOD: fix later
  return <Wrapper {...(wrapperProps ?? {})}>{children}</Wrapper>;
}
