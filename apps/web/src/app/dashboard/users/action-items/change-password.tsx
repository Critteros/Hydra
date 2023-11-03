'use client';

import { useRouter } from 'next/navigation';

import { type ComponentProps, useState } from 'react';

import { type ApolloError, useMutation } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { StatusCodes } from 'http-status-codes';
import { KeyRound } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { DropdownDialogItem } from '@/components/ui/dropdown-menu';
import {
  Form,
  FormControl,
  FormItem,
  FormField,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Icons } from '@/components/ui/icons';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

import type { User } from '../queries';

import { changeCurentUserPasswordMutation } from './mutations';

const formSchema = z
  .object({
    oldPassword: z.string().min(1, { message: 'Old password cannot be empty' }),
    newPassword: z.string().min(4, { message: 'New password cannot be empty' }),
    confirmNewPassword: z.string().min(4, { message: 'Confirm new password cannot be empty' }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'Passwords do not match',
    path: ['confirmNewPassword'],
  });
export type FormSchema = z.infer<typeof formSchema>;

type ChangePasswordActionProps = { user: User } & Pick<
  ComponentProps<typeof DropdownDialogItem>,
  'onSelect' | 'onOpenChange'
>;

export function ChangePasswordAction({ user, onOpenChange, ...props }: ChangePasswordActionProps) {
  const [dialogOpen, setDialogOpnen] = useState(false);
  const [changeCurrentUserPassword] = useMutation(changeCurentUserPasswordMutation);
  const { toast } = useToast();
  const { refresh } = useRouter();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  });
  const { isSubmitting } = form.formState;

  const handleDialogOpenChange = (open: boolean) => {
    setDialogOpnen(open);
    onOpenChange?.(open);
  };

  const onSubmit = async (values: FormSchema) => {
    try {
      await changeCurrentUserPassword({
        variables: {
          data: {
            currentPassword: values.oldPassword,
            newPassword: values.newPassword,
          },
        },
      });
    } catch (e) {
      const error = e as ApolloError;
      toast({
        title: 'Password change failed',
        description: `The password for ${user.email} could not be changed. Reason: ${error.message}`,
        variant: 'destructive',
      });
      form.setError('root.serverError', {
        type: StatusCodes.BAD_REQUEST.toString(),
        message: error.message,
      });
      return;
    }

    toast({
      title: 'Password changed',
      description: `The password for ${user.email} has been changed`,
    });
    refresh();
    handleDialogOpenChange(false);
  };

  return (
    <DropdownDialogItem
      dropdownItem={
        <>
          <KeyRound className="mr-2 h-4 w-4" />
          <span>Change password</span>
        </>
      }
      dialogProps={{
        open: dialogOpen,
      }}
      onOpenChange={handleDialogOpenChange}
      {...props}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change password</DialogTitle>
          <DialogDescription>
            Change the password for <strong>{user.email}</strong>
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="grid gap-4 py-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              name="oldPassword"
              control={form.control}
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">Old password</FormLabel>
                  <FormControl>
                    <Input
                      className="col-span-3"
                      type="password"
                      autoComplete="current-password"
                      id={field.name}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="col-span-3 col-start-2" />
                </FormItem>
              )}
            />
            <FormField
              name="newPassword"
              control={form.control}
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">New password</FormLabel>
                  <FormControl>
                    <Input
                      className="col-span-3"
                      type="password"
                      autoComplete="new-password"
                      id={field.name}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="col-span-3 col-start-2" />
                </FormItem>
              )}
            />
            <FormField
              name="confirmNewPassword"
              control={form.control}
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">Confirm new password</FormLabel>
                  <FormControl>
                    <Input
                      className="col-span-3"
                      type="password"
                      autoComplete="new-password"
                      id={field.name}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="col-span-3 col-start-2" />
                </FormItem>
              )}
            />
            {form.formState.errors.root?.serverError?.type ==
              StatusCodes.BAD_REQUEST.toString() && (
              <span className="text-sm font-medium text-destructive">
                {(form.formState.errors.root?.serverError as ApolloError).message}
              </span>
            )}
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
              Log in
            </Button>
          </form>
        </Form>
      </DialogContent>
    </DropdownDialogItem>
  );
}
