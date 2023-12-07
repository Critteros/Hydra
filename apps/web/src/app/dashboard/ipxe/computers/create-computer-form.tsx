'use client';

import { useRouter } from 'next/navigation';

import type { ApolloError } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Icons } from '@/components/ui/icons';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

import { createComputerMutation, addComputerToGroupMutation } from './computer-mutations';

const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Name cannot be empty' })
    .max(255, { message: 'Name is too long' }),
  ipv4: z
    .union([
      z.string().length(0),
      z.string().ip({ version: 'v4', message: 'Invalid IPv4 address' }),
    ])
    .transform((val) => (val === '' ? null : val)),
  mac: z
    .string()
    .regex(/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/, { message: 'Invalid mac address' }),
});

export type FormSchema = z.infer<typeof formSchema>;

type CreateComputerFormProps = {
  afterSubmit?: () => void;
  groupUid?: string;
};

export function CreateComputerForm({ afterSubmit, groupUid }: CreateComputerFormProps) {
  const { toast } = useToast();
  const { refresh } = useRouter();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ipv4: '',
      mac: '',
      name: '',
    },
  });
  const [createComputer] = useMutation(createComputerMutation);
  const [addComputerToGroup] = useMutation(addComputerToGroupMutation);
  const { isSubmitting } = form.formState;

  const onSubmit = async (values: FormSchema) => {
    try {
      const { data } = await createComputer({
        variables: {
          data: {
            ...values,
          },
        },
      });
      if (groupUid) {
        if (!data?.createComputer.uid) {
          throw new Error('Could not create computer');
        }
        await addComputerToGroup({
          variables: {
            groupUid,
            computerUid: data.createComputer.uid,
          },
        });
      }
      toast({
        title: 'Computer created',
        description: `Computer ${values.name} has been created`,
      });
      refresh();
      afterSubmit?.();
    } catch (e) {
      const error = e as ApolloError;
      toast({
        title: 'Could not create computer',
        description: `${error.message}`,
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

        <FormField
          name="ipv4"
          control={form.control}
          render={({ field: { value, ...rest } }) => (
            <FormItem className="grid grid-cols-4 items-center gap-4">
              <FormLabel className="text-right">Ipv4</FormLabel>
              <FormControl>
                <Input
                  className="col-span-3"
                  placeholder="127.0.0.1"
                  value={value ?? ''}
                  {...rest}
                />
              </FormControl>
              <FormMessage className="col-span-3 col-start-2" />
            </FormItem>
          )}
        />

        <FormField
          name="mac"
          control={form.control}
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center gap-4">
              <FormLabel className="text-right">Mac</FormLabel>
              <FormControl>
                <Input className="col-span-3" placeholder="00:00:00:00:00:00" {...field} />
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
