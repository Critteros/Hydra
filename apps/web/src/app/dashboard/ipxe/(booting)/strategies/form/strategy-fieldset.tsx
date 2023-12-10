'use client';

import { useFormContext } from 'react-hook-form';
import { z } from 'zod';

import { FormField, FormLabel, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

export const StrategyCommonFieldSchema = z.object({
  name: z.string().max(255).min(1),
  description: z.string().max(255).min(1),
});

export function StrategyFieldset() {
  const form = useFormContext<{ name: string; description: string }>();

  return (
    <>
      <FormField
        name="name"
        control={form.control}
        render={({ field }) => (
          <FormItem className="grid grid-cols-4 items-center gap-4">
            <FormLabel className="text-right">Strategy name</FormLabel>
            <FormControl>
              <Input placeholder="name" className="col-span-3" {...field} />
            </FormControl>
            <FormMessage className="col-span-3 col-start-2" />
          </FormItem>
        )}
      />

      <FormField
        name="description"
        control={form.control}
        render={({ field }) => (
          <FormItem className="grid grid-cols-4 items-center gap-4">
            <FormLabel className="text-right">Strategy descrption</FormLabel>
            <FormControl>
              <Input placeholder="desciption" className="col-span-3" {...field} />
            </FormControl>
            <FormMessage className="col-span-3 col-start-2" />
          </FormItem>
        )}
      />
    </>
  );
}
