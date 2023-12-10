'use client';

import { useRouter } from 'next/navigation';

import { useCallback } from 'react';

import { useToast } from '@/components/ui/use-toast';

import type { FormProps } from './form-props';

type FormHelpersOptions = Pick<FormProps, 'afterSubmit'> & {
  actionSucessDescription: string;
};

export function useFormHelpers({ afterSubmit, actionSucessDescription }: FormHelpersOptions) {
  const { refresh } = useRouter();
  const { toast } = useToast();

  const onSucess = useCallback(() => {
    toast({
      title: 'Success',
      description: actionSucessDescription,
    });
    refresh();
    afterSubmit?.();
  }, [toast, refresh, afterSubmit, actionSucessDescription]);

  const onError = useCallback(
    (error: Error) => {
      toast({
        title: 'Failure',
        description: `Action failed with error message: ${error.message}`,
      });
    },
    [toast],
  );

  return {
    onSucess,
    onError,
  } as const;
}
