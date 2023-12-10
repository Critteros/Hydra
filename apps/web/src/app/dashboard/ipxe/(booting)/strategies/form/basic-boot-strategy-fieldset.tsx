'use client';

import { useFormContext } from 'react-hook-form';

import { FormField, FormLabel, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

export function BasicBootStrategyFieldSet() {
  const form = useFormContext<{ kernelParams?: string }>();

  return (
    <>
      <FormField
        name="kernelParams"
        control={form.control}
        render={({ field }) => (
          <FormItem className="grid grid-cols-4 items-center gap-4">
            <FormLabel className="text-right">Kernel params</FormLabel>
            <FormControl>
              <Input placeholder="Kernel params" className="col-span-3" {...field} />
            </FormControl>
            <FormMessage className="col-span-3 col-start-2" />
          </FormItem>
        )}
      />
    </>
  );
}
