'use client';

import { useState, useEffect, memo } from 'react';

import axios, { CanceledError } from 'axios';
import { File, XCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Typography } from '@/components/ui/typography';

type UploadingFileProps = {
  file: File;
  onDelete: (file: File) => void;
  onUploadComplete: (file: File) => void;
};

const UPLOAD_PATH = '/api/ipxe/upload';

export const UploadingFile = memo(
  ({ file, onDelete: onDelete, onUploadComplete }: UploadingFileProps) => {
    const [progress, setProgress] = useState(0);

    const fileSizeMB = file.size / 1024 / 1024;

    useEffect(() => {
      let running = true;
      let done = false;
      const abortController = new AbortController();
      const upload = async () => {
        const formData = new FormData();
        formData.append('files', file);

        await axios.post(UPLOAD_PATH, formData, {
          onUploadProgress: (progressEvent) => {
            setProgress(progressEvent.loaded);
          },
          signal: abortController.signal,
        });
        running && onUploadComplete(file);
        done = true;
      };

      void upload().catch((error) => {
        if (error instanceof CanceledError) {
          return;
        }
        throw error;
      });

      return () => {
        running = false;
        !done && abortController.abort();
      };
    }, [file, onUploadComplete]);

    return (
      <div className="frod align- my-3 grid grid-cols-12 items-center justify-center justify-items-center gap-4">
        <File className="col-span-1 h-6 w-6" />
        <p className="col-span-2 font-medium">{file.name}</p>
        <Typography className="col-span-2 whitespace-nowrap text-muted-foreground dark:text-white">
          {(progress / 1024 / 1024).toFixed()} MB / {fileSizeMB.toFixed(2)} MB
        </Typography>
        <Progress className="col-span-6" value={progress / fileSizeMB} />
        <Button
          size="icon"
          className="col-span-1 flex-shrink-0"
          variant="destructive"
          onClick={() => {
            onDelete(file);
          }}
        >
          <XCircle className="h-6 w-6" />
        </Button>
      </div>
    );
  },
);
UploadingFile.displayName = 'UploadingFile';
