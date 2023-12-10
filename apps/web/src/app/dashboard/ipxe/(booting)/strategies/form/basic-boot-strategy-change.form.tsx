'use client';

import type { ApolloError } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  BasicBootDataSchema,
  type IPXEStrategy,
} from '@hydra-ipxe/common/shared/ipxe/strategies.def';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Icons } from '@/components/ui/icons';

import { BasicBootInfoFieldSet } from './basic-boot-info-fieldset';
import { BasicBootStrategyFieldSet } from './basic-boot-strategy-fieldset';
import type { FormProps, FormWithBasicBootInfo } from './form-props';
import { StrategyCommonFieldSchema, StrategyFieldset } from './strategy-fieldset';
import { useFormHelpers } from './useFormHelpers';

const formSchema = BasicBootDataSchema.and(StrategyCommonFieldSchema).refine(
  ({ initramfsPath, kernelPath }) => initramfsPath !== kernelPath,
  {
    message: 'Kernel path must be different from initramfspath',
    path: ['initramfsPath'],
  },
);
type FormSchema = z.infer<typeof formSchema>;

type BasicBootChangeFormProps = FormProps &
  FormWithBasicBootInfo & {
    defaultValues?: FormSchema;
    mutateFn: (values: FormSchema & { templateId: IPXEStrategy }) => Promise<void>;
  };

export function BasicBootChangeForm({
  afterSubmit,
  defaultValues,
  assetPaths,
  mutateFn,
}: BasicBootChangeFormProps) {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues ?? {
      initramfsPath: '',
      kernelParams: '',
      kernelPath: '',
      name: '',
      description: '',
    },
  });
  const { onError, onSucess } = useFormHelpers({
    afterSubmit,
    actionSucessDescription: 'Strategy updated',
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: FormSchema) => {
    try {
      await mutateFn({ ...values, templateId: 'strategy.basicBoot' });
      onSucess();
    } catch (e) {
      const error = e as ApolloError;
      onError(error);
    }
  };

  return (
    <Form {...form}>
      <form className="grid gap-4 py-4" onSubmit={form.handleSubmit(onSubmit)}>
        <StrategyFieldset />
        <BasicBootInfoFieldSet assetPaths={assetPaths} />
        <BasicBootStrategyFieldSet />

        {form.formState.errors.root?.serverError && (
          <span className="text-sm font-medium text-destructive">
            {form.formState.errors.root?.serverError.message}
          </span>
        )}

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Submit
        </Button>
      </form>
    </Form>
  );
}
