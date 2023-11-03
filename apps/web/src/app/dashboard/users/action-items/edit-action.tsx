import { useRouter } from 'next/navigation';

import type { ComponentProps } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { StatusCodes } from 'http-status-codes';
import { PencilLine } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { AccountType } from '@/__generated__/graphql';
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Icons } from '@/components/ui/icons';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';

import type { User } from '../queries';

const formSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  accountType: z.nativeEnum(AccountType),
});
type FormSchema = z.infer<typeof formSchema>;

type ChangePasswordActionProps = { user: User } & Pick<
  ComponentProps<typeof DropdownDialogItem>,
  'onSelect' | 'onOpenChange'
>;

export function EditAction({ user, ...props }: ChangePasswordActionProps) {
  const { refresh } = useRouter();
  const { toast } = useToast();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: user.email,
      name: user.name ?? '',
      accountType: user.accountType,
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: FormSchema) => {
    const data = {
      ...values,
      name: values.name === '' ? null : values.name,
    };

    console.log(data);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    toast({
      title: 'User profile updated',
      description: 'User profile has been updated successfully',
    });
    refresh();
  };

  return (
    <DropdownDialogItem
      dropdownItem={
        <>
          <PencilLine className="mr-2 h-4 w-4" />
          <span>Edit</span>
        </>
      }
      {...props}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to user profile. Click save when you&apos;re done
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="grid gap-4 py-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">Email</FormLabel>
                  <FormControl>
                    <Input className="col-span-3" {...field} />
                  </FormControl>
                  <FormMessage className="col-span-3 col-start-2" />
                </FormItem>
              )}
            />

            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">Name</FormLabel>
                  <FormControl>
                    <Input className="col-span-3" placeholder="Not set" {...field} />
                  </FormControl>
                  <FormMessage className="col-span-3 col-start-2" />
                </FormItem>
              )}
            />

            <FormField
              name="accountType"
              control={form.control}
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">Account type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select tpe of an account" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={AccountType.Admin}>Admin Account</SelectItem>
                      <SelectItem value={AccountType.Standard}>Standard Account</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="col-span-3 col-start-2" />
                </FormItem>
              )}
            />
            {form.formState.errors.root?.serverError?.type ==
              StatusCodes.UNAUTHORIZED.toString() && (
              <span className="text-sm font-medium text-destructive">
                Invalid email or password
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
