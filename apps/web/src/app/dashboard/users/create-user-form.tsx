import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { AccountType } from '@/__generated__/graphql';
import { Button } from '@/components/ui/button';
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

const formSchema = z
  .object({
    email: z.string().email({ message: 'Please enter a valid email' }),
    password: z.string().min(4, { message: 'Password must be at least 4 characters' }),
    confirmPassword: z
      .string()
      .min(4, { message: 'Confirm password must be at least 4 characters' }),
    name: z.string().optional(),
    accountType: z.nativeEnum(AccountType).default(AccountType.Standard),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });
export type FormSchema = z.infer<typeof formSchema>;

export function CreateUserForm() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      accountType: AccountType.Standard,
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
    },
  });
  const { isSubmitting } = form.formState;

  const onSubmit = async (data: FormSchema) => {
    console.log(data);
    await new Promise((resolve) => setTimeout(resolve, 2000));
  };

  return (
    <Form {...form}>
      <form className="grid gap-4 py-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center gap-4">
              <FormLabel className="text-right">Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" autoComplete="email" className="col-span-3" {...field} />
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
                <Input
                  placeholder="Username"
                  autoComplete="username"
                  className="col-span-3"
                  {...field}
                />
              </FormControl>
              <FormMessage className="col-span-3 col-start-2" />
            </FormItem>
          )}
        />
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center gap-4">
              <FormLabel className="text-right">Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Password"
                  autoComplete="new-password"
                  className="col-span-3"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage className="col-span-3 col-start-2" />
            </FormItem>
          )}
        />
        <FormField
          name="confirmPassword"
          control={form.control}
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center gap-4">
              <FormLabel className="text-right">Confirm password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Confirm password"
                  autoComplete="new-password"
                  className="col-span-3"
                  type="password"
                  {...field}
                />
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
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Submit
        </Button>
      </form>
    </Form>
  );
}
