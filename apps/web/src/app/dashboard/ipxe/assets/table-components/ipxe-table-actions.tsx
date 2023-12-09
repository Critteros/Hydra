import { useRouter } from 'next/navigation';

import { useState } from 'react';

import { useMutation, type ApolloError } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { RESOURCE_ID_REGEX } from '@hydra-ipxe/common/shared/regex';
import type { Row } from '@tanstack/react-table';
import { Edit } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Icons } from '@/components/ui/icons';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

import { EditAssetMutation } from '../assets-mutations';
import type { IpxeAsset } from '../assets-queries';

const formSchema = z.object({
  resourceId: z
    .string()
    .transform((value) => {
      if (value.startsWith('/')) {
        // TODO: Replace with StringUtil
        return value.slice(1, value.length);
      }
      return value;
    })
    .pipe(
      z
        .string()
        .regex(
          RESOURCE_ID_REGEX,
          'Invalid resource ID - resource id have to contain URL safe characters',
        ),
    ),

  filename: z.string().min(1),
});
type FormSchema = z.infer<typeof formSchema>;

type IpxeTableActionsProps = {
  row: Row<IpxeAsset>;
};

export function IpxeTableActions({ row }: IpxeTableActionsProps) {
  const { resourceId, filename, uid } = row.original;

  const [open, setOpen] = useState(false);
  const [editAsset] = useMutation(EditAssetMutation);
  const { toast } = useToast();
  const { refresh } = useRouter();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      filename,
      resourceId,
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: FormSchema) => {
    try {
      await editAsset({
        variables: {
          where: {
            uid,
          },
          data: {
            ...values,
          },
        },
      });
      toast({
        title: 'Asset updated',
        description: 'The asset has been updated',
      });
      setOpen(false);
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="outline">
          <Edit />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex flex-row gap-2">
            <span>Edit Asset</span>
            <span>{resourceId}</span>
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="grid gap-4 py-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              name="resourceId"
              control={form.control}
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">Resource</FormLabel>
                  <FormControl>
                    <Input className="col-span-3" {...field} />
                  </FormControl>
                  <FormMessage className="col-span-3 col-start-2" />
                </FormItem>
              )}
            />

            <FormField
              name="filename"
              control={form.control}
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">Filename</FormLabel>
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
      </DialogContent>
    </Dialog>
  );
}
