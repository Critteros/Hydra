'use client';

import { useRouter } from 'next/navigation';

import { gql } from '$gql';
import type { IpxeStrategy } from '$gql/types';
import { type ApolloError, useMutation } from '@apollo/client';

import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectContent,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';

const UpdateGlobalStrategyMutation = gql(`
  mutation UpdateGlobalStrategy($whichStrategy: WhereUniqueIpxeStrategyNullable) {
    changeGlobalIpxeStrategy(whichStretgy: $whichStrategy) {
      __typename
    }
  }
`);

type GlobalStrategySelectorProps = {
  strategy?: Pick<IpxeStrategy, 'name' | 'uid'> | undefined | null;
  strategies: Array<Pick<IpxeStrategy, 'name' | 'uid'>>;
};

export function GlobalStrategySelector({ strategy, strategies }: GlobalStrategySelectorProps) {
  const [updateGlobalStrategy] = useMutation(UpdateGlobalStrategyMutation);
  const { toast } = useToast();
  const { refresh } = useRouter();

  const onValueChange = async (newValue: string) => {
    const toSet = newValue !== 'null' ? newValue : null;

    try {
      await updateGlobalStrategy({
        variables: {
          whichStrategy: toSet
            ? {
                uid: toSet,
              }
            : null,
        },
      });
      refresh();
    } catch (e) {
      const error = e as ApolloError;
      toast({
        title: 'Could not change global strategy',
        description: `Recieved error ${error.message}`,
      });
    }
  };

  return (
    <Select onValueChange={onValueChange} defaultValue={strategy?.uid ?? 'null'}>
      <SelectTrigger>
        <SelectValue placeholder="placeholder" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={'null'}>
          <span className="text-muted-foreground">{'<Inherited>'}</span>
        </SelectItem>
        {strategies.map(({ name, uid }) => (
          <SelectItem key={uid} value={uid}>
            {name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
