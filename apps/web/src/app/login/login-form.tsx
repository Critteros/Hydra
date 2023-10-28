'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { StatusCodes } from 'http-status-codes';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

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
import { useHistory } from '@/lib/client/hooks/history';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});
type LoginSchema = z.infer<typeof formSchema>;

export function LoginForm() {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const { backOrDefault } = useHistory();

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: LoginSchema) => {
    const res = await fetch('/api/auth/login', {
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      cache: 'no-store',
    });

    if (res.ok) {
      backOrDefault('/');
      return;
    }

    form.setError('root.serverError', {
      type: StatusCodes.UNAUTHORIZED.toString(),
      message: 'Invalid email or password',
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" autoComplete="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Password"
                  type="password"
                  autoComplete="current-password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.formState.errors.root?.serverError?.type == StatusCodes.UNAUTHORIZED.toString() && (
          <span className="text-sm font-medium text-destructive">Invalid email or password</span>
        )}
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Log in
        </Button>
      </form>
    </Form>
  );
}
