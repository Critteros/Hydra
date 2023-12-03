'use client';

import { useState } from 'react';

import { File, XCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Typography } from '@/components/ui/typography';

type UploadingFileProps = {
  file: File;
  onCancel: (file: File) => void;
  onUploadComplete: (file: File) => void;
};

export function UploadingFile({ file, onCancel, onUploadComplete }: UploadingFileProps) {
  const [progress, setProgress] = useState(0);

  const fileSizeMB = file.size / 1024 / 1024;

  return (
    <div className="my-3 flex items-center gap-4">
      <div className="flex flex-grow flex-row items-center justify-between gap-4">
        <File className="h-6 w-6" />
        <p className="font-medium">{file.name}</p>
        <Typography className="whitespace-nowrap text-muted-foreground dark:text-white">
          {progress.toFixed()} MB / {fileSizeMB.toFixed(2)} MB
        </Typography>
      </div>
      <Progress value={progress / fileSizeMB} />
      <Button
        size="icon"
        className="flex-shrink-0"
        variant="destructive"
        onClick={() => {
          setProgress(0);
        }}
      >
        <XCircle className="h-6 w-6" />
      </Button>
    </div>
  );
}
