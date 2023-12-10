'use client';

import type { ComponentProps } from 'react';

import { gql } from '$gql';
import { useMutation } from '@apollo/client';

import { BasicBootStrategyDefaultValuesQuery } from '../strategies-queries';

import { BasicBootChangeForm } from './basic-boot-strategy-change.form';

const BasicBootStrategyCreateMutation = gql(`
  mutation BasicBootStrategyCreate($input: BasicBootStrategyCreateInput!) {
    createBasicBootStrategy(input: $input) {
      uid
    }
  }
`);

type ChangeFormProps = ComponentProps<typeof BasicBootChangeForm>;

export function BasicBootStrategyCreateForm(props: Omit<ChangeFormProps, 'mutateFn'>) {
  const [mutate] = useMutation(BasicBootStrategyCreateMutation);
  return (
    <BasicBootChangeForm
      {...props}
      mutateFn={async ({
        initramfsPath,
        kernelParams,
        kernelPath,
        templateId,
        description,
        name,
      }) => {
        await mutate({
          variables: {
            input: {
              initramfsPath,
              kernelPath,
              kernelParams,
              template: { id: templateId },
              description,
              name,
            },
          },
          refetchQueries: [BasicBootStrategyDefaultValuesQuery],
        });
      }}
    />
  );
}
