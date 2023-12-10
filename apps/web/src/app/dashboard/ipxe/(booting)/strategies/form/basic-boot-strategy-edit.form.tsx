'use client';

import type { ComponentProps } from 'react';

import { gql } from '$gql';
import type { IpxeStrategy } from '$gql/types';
import { useMutation } from '@apollo/client';

import { BasicBootStrategyDefaultValuesQuery } from '../strategies-queries';

import { BasicBootChangeForm } from './basic-boot-strategy-change.form';

const BasicBootStrategyEditMutation = gql(`
  mutation BasicBootStrategyUpdate($strategyUid: String!, $update: BasicBootStrategyUpdateInput!) {
    updateBasicBootStrategy(where: {uid: $strategyUid}, update: $update) {
      uid
    }
  }
`);

type ChangeFormProps = ComponentProps<typeof BasicBootChangeForm>;

export function BasicBootStrategyEditForm(
  props: Omit<ChangeFormProps, 'mutateFn'> & { strategyUid: IpxeStrategy['uid'] },
) {
  const { strategyUid } = props;
  const [mutate] = useMutation(BasicBootStrategyEditMutation);

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
            update: {
              initramfsPath,
              kernelPath,
              kernelParams,
              template: { id: templateId },
              description,
              name,
            },
            strategyUid: strategyUid,
          },
          refetchQueries: [BasicBootStrategyDefaultValuesQuery],
        });
      }}
    />
  );
}
