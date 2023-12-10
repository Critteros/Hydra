'use client';

import { useState, useEffect } from 'react';

import { gql } from '$gql';
import type { IpxeAsset, IpxeStrategyTemplate, IpxeStrategy } from '$gql/types';
import { useQuery } from '@apollo/client';
import type { IPXEStrategy } from '@hydra-ipxe/common/shared/ipxe/strategies.def';

import { EditButton } from '@/components/buttons/edit-button';
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';

import { BasicBootStrategyEditForm } from '../form/basic-boot-strategy-edit.form';
import { TemplateSelect } from '../form/template-select';
import { BasicBootStrategyDefaultValuesQuery } from '../strategies-queries';

type EditStrategyDialogProps = {
  assetPaths: Array<IpxeAsset['resourceId']>;
  templates: Array<Pick<IpxeStrategyTemplate, 'id' | 'name'>>;
  strategyUid: IpxeStrategy['uid'];
};

export function EditStrategyDialog({
  assetPaths,
  templates,
  strategyUid,
}: EditStrategyDialogProps) {
  const [open, setOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<IPXEStrategy>(
    (templates[0]?.id as IPXEStrategy) ?? 'strategy.basicBoot',
  );

  const { data } = useQuery(BasicBootStrategyDefaultValuesQuery, {
    variables: {
      strategyUid,
    },
  });

  useEffect(() => {
    if (data) {
      setSelectedTemplate(data.basicBootStrategy.template.id as IPXEStrategy);
    }
  }, [data]);

  if (!data) {
    return <p>Loading...</p>;
  }
  const { description, initramfsPath, kernelPath, name, kernelParams } = data.basicBootStrategy;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <EditButton icon />
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
          <BasicBootStrategyEditForm
            assetPaths={assetPaths}
            afterSubmit={() => setOpen(false)}
            strategyUid={strategyUid}
            defaultValues={{
              description,
              initramfsPath,
              kernelParams: kernelParams ?? '',
              kernelPath,
              name,
            }}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
