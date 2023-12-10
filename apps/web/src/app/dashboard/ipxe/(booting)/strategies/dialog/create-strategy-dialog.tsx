'use client';

import { useState } from 'react';

import type { IpxeAsset, IpxeStrategyTemplate } from '$gql/types';
import type { IPXEStrategy } from '@hydra-ipxe/common/shared/ipxe/strategies.def';

import { CreateButton } from '@/components/buttons/create-button';
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';

import { BasicBootStrategyCreateForm } from '../form/basic-boot-strategy-create.form';
import { TemplateSelect } from '../form/template-select';

type CreateStrategyDialogProps = {
  assetPaths: Array<IpxeAsset['resourceId']>;
  templates: Array<Pick<IpxeStrategyTemplate, 'id' | 'name'>>;
};
export function CreateStrategyDialog({ assetPaths, templates }: CreateStrategyDialogProps) {
  const [open, setOpen] = useState(false);

  const [selectedTemplate, setSelectedTemplate] = useState<IPXEStrategy>(
    (templates[0]?.id as IPXEStrategy) ?? 'strategy.basicBoot',
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <CreateButton>Create strategy</CreateButton>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex flex-row gap-2">Edit strategy</DialogTitle>
        </DialogHeader>
        <TemplateSelect
          templates={templates}
          defaultValue={selectedTemplate}
          onValueChange={setSelectedTemplate}
        />
        {selectedTemplate === 'strategy.basicBoot' && (
          <BasicBootStrategyCreateForm assetPaths={assetPaths} afterSubmit={() => setOpen(false)} />
        )}
      </DialogContent>
    </Dialog>
  );
}
