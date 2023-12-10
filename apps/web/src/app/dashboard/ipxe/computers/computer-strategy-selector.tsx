'use client';

import { useRouter } from 'next/navigation';

import { gql } from '$gql';
import type { Computer, IpxeStrategy } from '$gql/types';
import { type ApolloError, useMutation } from '@apollo/client';

import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectContent,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';

const UpdateComputerStrategyMutation = gql(`
  mutation UpdateComputerStrategy($computerUid: String!, $whichStrategy: WhereUniqueIpxeStrategyNullable) {
    changeComputerStrategy(whichComputer: {uid: $computerUid}, whichStrategy: $whichStrategy) {
      uid
    }
  }
`);

type ComputerStrategySelectorProps = {
  computerUid: Computer['uid'];
  strategy?: Pick<IpxeStrategy, 'name' | 'uid'> | undefined | null;
  strategies: Array<Pick<IpxeStrategy, 'name' | 'uid'>>;
};

export function ComputerStrategySelector({
  strategy,
  computerUid,
  strategies,
}: ComputerStrategySelectorProps) {
  const [updateComputerStrategy] = useMutation(UpdateComputerStrategyMutation);
  const { toast } = useToast();
  const { refresh } = useRouter();

  const onValueChange = async (newValue: string) => {
    const toSet = newValue !== 'null' ? newValue : null;

    try {
      await updateComputerStrategy({
        variables: {
          computerUid,
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
        title: 'Could not change computer strategy',
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
