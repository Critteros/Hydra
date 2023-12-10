'use client';

import type { IpxeAsset } from '$gql/types';
import { useFormContext } from 'react-hook-form';

import { FormField, FormLabel, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectContent,
  SelectValue,
} from '@/components/ui/select';

type BasicBootInfoFieldSetProps = {
  assetPaths: Array<IpxeAsset['resourceId']>;
};

export function BasicBootInfoFieldSet({ assetPaths }: BasicBootInfoFieldSetProps) {
  const form = useFormContext<{ initramfsPath: string; kernelPath: string }>();

  return (
    <>
      <FormField
        name="kernelPath"
        control={form.control}
        render={({ field }) => (
          <FormItem className="grid grid-cols-4 items-center gap-4">
            <FormLabel className="text-right">Kernel Path</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select kernel path" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {assetPaths.map((resourceId) => (
                  <SelectItem key={resourceId} value={resourceId}>
                    {'/' + resourceId}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage className="col-span-3 col-start-2" />
          </FormItem>
        )}
      />

      <FormField
        name="initramfsPath"
        control={form.control}
        render={({ field }) => (
          <FormItem className="grid grid-cols-4 items-center gap-4">
            <FormLabel className="text-right">Initramfs Path</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select initramfs path" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {assetPaths.map((resourceId) => (
                  <SelectItem key={resourceId} value={resourceId}>
                    {'/' + resourceId}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage className="col-span-3 col-start-2" />
          </FormItem>
        )}
      />
    </>
  );
}
