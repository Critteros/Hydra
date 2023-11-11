'use client';

import { useState, type ComponentProps } from 'react';

import { useMutation } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { KeyRound } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
} from '@/components/ui/dialog';
import { DropdownDialogItem } from '@/components/ui/dropdown-menu';
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

import { adminChangeUserPasswordMutation } from '../user-mutations';
import type { User } from '../user-queries';

const formSchema = z
  .object({
    newPassword: z.string().min(1, { message: 'New password cannot be empty' }),
    confirmNewPassword: z.string().min(1, { message: 'Confirm new password cannot be empty' }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    path: ['confirmNewPassword'],
    message: 'Passwords do not match',
  });
type FormSchema = z.infer<typeof formSchema>;

type AdminChangePasswordActionProps = { user: User } & Pick<
  ComponentProps<typeof DropdownDialogItem>,
  'onSelect' | 'onOpenChange'
>;

export function AdminChangePasswordAction({
  user,
  onOpenChange,
  ...props
}: AdminChangePasswordActionProps) {
  const { toast } = useToast();
  const [changePassword] = useMutation(adminChangeUserPasswordMutation);
  const [dialogOpen, setDialogOpen] = useState(false);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: '',
      confirmNewPassword: '',
    },
  });
  const { isSubmitting } = form.formState;

  const handleDialogOpenChange = (open: boolean) => {
    setDialogOpen(open);
    onOpenChange?.(open);
  };

  const onSubmit = async (data: FormSchema) => {
    await changePassword({
      variables: {
        uid: user.uid,
        newPassword: data.newPassword,
      },
    });

    toast({
      title: 'Password changed',
      description: `The password for ${user.email} has been changed`,
    });

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
                  <FormLabel className="text-right">Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      className="col-span-3"
                      type="password"
                      autoComplete="new-password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="col-span-3 col-start-2" />
                </FormItem>
              )}
            />
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
