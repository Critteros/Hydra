'use client';

import { useRouter } from 'next/navigation';

import { type ApolloError, useMutation } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from '@/components/ui/form';
import { Icons } from '@/components/ui/icons';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

import { createComputerGroupMutation } from './computer-mutations';

const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Name cannot be empty' })
    .max(255, { message: 'Name is too long' }),
});

export type FormSchema = z.infer<typeof formSchema>;

type CreateComputerGroupFormProps = {
  afterSubmit?: () => void;
};

export function CreateComputerGroupForm({ afterSubmit }: CreateComputerGroupFormProps) {
  const { toast } = useToast();
  const { refresh } = useRouter();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  const [createComputerGroup] = useMutation(createComputerGroupMutation);

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: FormSchema) => {
    try {
      await createComputerGroup({
        variables: {
          data: {
            ...values,
          },
        },
      });
      toast({
        title: 'Computer group created',
        description: 'The computer group has been created',
      });
      afterSubmit?.();
      refresh();
    } catch (e) {
      const error = e as ApolloError;
      toast({
        title: 'An error occurred',
        description: error.message,
        variant: 'destructive',
      });

      form.setError('root.serverError', { message: error.message });
    }
  };

  return (
    <Form {...form}>
      <form className="grid gap-4 py-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center gap-4">
              <FormLabel className="text-right">Name</FormLabel>
              <FormControl>
                <Input className="col-span-3" {...field} />
              </FormControl>
              <FormMessage className="col-span-3 col-start-2" />
            </FormItem>
          )}
        />

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
