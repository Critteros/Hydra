'use client';

import type { IpxeStrategyTemplate } from '$gql/types';
import type { IPXEStrategy } from '@hydra-ipxe/common/shared/ipxe/strategies.def';

import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectContent,
  SelectValue,
} from '@/components/ui/select';

type TemplateSelectFieldProps = {
  templates: Array<Pick<IpxeStrategyTemplate, 'id' | 'name'>>;
  onValueChange: (value: IPXEStrategy) => void;
  defaultValue?: IPXEStrategy;
};

export function TemplateSelect({
  templates,
  onValueChange,
  defaultValue,
}: TemplateSelectFieldProps) {
  return (
    <Select onValueChange={onValueChange} defaultValue={defaultValue}>
      <SelectTrigger>
        <SelectValue placeholder="Select strategy template" />
      </SelectTrigger>
      <SelectContent>
        {templates.map(({ id, name }) => (
          <SelectItem key={id} value={id}>
            {name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
