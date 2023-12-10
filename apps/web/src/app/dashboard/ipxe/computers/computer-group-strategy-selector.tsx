'use client';

import { useRouter } from 'next/navigation';

import { gql } from '$gql';
import type { ComputerGroup, IpxeStrategy } from '$gql/types';
import { type ApolloError, useMutation } from '@apollo/client';

import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectContent,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';

const UpdateComputerGroupStrategyMutation = gql(`
  mutation UpdateComputerGroupStrategy($computerGroupUid: String!, $whichStrategy: WhereUniqueIpxeStrategyNullable) {
    changeComputerGroupStrategy(whichComputerGroup: {uid: $computerGroupUid}, whichStrategy: $whichStrategy) {
      uid
    }
  }
`);

type ComputerGroupStrategySelectorProps = {
  computerGroupUid: ComputerGroup['uid'];
  strategy?: Pick<IpxeStrategy, 'name' | 'uid'> | undefined | null;
  strategies: Array<Pick<IpxeStrategy, 'name' | 'uid'>>;
};

export function ComputerGroupStrategySelector({
  strategy,
  computerGroupUid,
  strategies,
}: ComputerGroupStrategySelectorProps) {
  const [updateComputerGroupStrategy] = useMutation(UpdateComputerGroupStrategyMutation);
  const { toast } = useToast();
  const { refresh } = useRouter();

  const onValueChange = async (newValue: string) => {
    const toSet = newValue !== 'null' ? newValue : null;

    try {
      await updateComputerGroupStrategy({
        variables: {
          computerGroupUid,
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
        title: 'Could not change computer group strategy',
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
