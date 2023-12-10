import type { IpxeStrategy } from '$gql/types';

type ReadonlyStrategyViewProps = {
  strategy?: Pick<IpxeStrategy, 'name'> | undefined | null;
};

export function ReadonlyStrategyView({ strategy }: ReadonlyStrategyViewProps) {
  if (!strategy) {
    return <span className="text-muted-foreground">{'<Inherited>'}</span>;
  }

  return <span>{strategy?.name}</span>;
}
