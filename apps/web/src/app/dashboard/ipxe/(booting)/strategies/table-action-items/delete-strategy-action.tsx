'use client';

import { useRouter } from 'next/navigation';

import { useCallback } from 'react';

import { gql } from '$gql';
import { type ApolloError, useMutation } from '@apollo/client';

import { DeleteButton } from '@/components/buttons/delete-button';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { useToast } from '@/components/ui/use-toast';

import type { CommonActionProps } from '../types';

const DeleteStrategyMutation = gql(`
  mutation DeleteStrategy($strategyUid: String!) {
    deleteIpxeStrategy(where: {uid: $strategyUid}) {
      __typename
    }
  }
`);

export function DeleteStategyAction({ strategyUid }: CommonActionProps) {
  const [mutate] = useMutation(DeleteStrategyMutation, {
    variables: {
      strategyUid: strategyUid,
    },
  });
  const { refresh } = useRouter();
  const { toast } = useToast();

  const onConfirm = useCallback(async () => {
    try {
      await mutate();
      toast({
        title: 'Strategy deleted',
        description: 'Strategy was sucesfully deleted',
      });
      refresh();
    } catch (e) {
      const error = e as ApolloError;
      toast({
        title: 'Could not delete strategy',
        description: `Error ${error.message} was thrown when deleting strategy`,
      });
    }
  }, [mutate, refresh, toast]);

  return (
    <ConfirmDialog onConfirm={onConfirm}>
      <DeleteButton icon />
    </ConfirmDialog>
  );
}
