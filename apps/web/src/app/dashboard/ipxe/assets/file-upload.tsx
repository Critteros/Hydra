'use client';

import { useState, useCallback } from 'react';

import { FilesIcon } from 'lucide-react';
import { nanoid } from 'nanoid';
import { type FileError, useDropzone, type FileRejection } from 'react-dropzone';

import { UploadingFile } from './uploading-file';

export type FileEntry = {
  id: string;
  file: File;
  error?: FileError[];
};

export function FileUpload() {
  const [files, setFiles] = useState<FileEntry[]>([]);

  const onDrop = useCallback((acceptedFiles: File[], fileRejections: FileRejection[]) => {
    setFiles((prevFiles) => [
      ...prevFiles,
      ...acceptedFiles.map((file) => ({
        id: nanoid(),
        file,
      })),
      ...fileRejections.map((fileRejection) => ({
        ...fileRejection,
        id: nanoid(),
      })),
    ]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  const onCancel = useCallback((file: File) => {
    setFiles((prevFiles) => prevFiles.filter((prevFile) => prevFile.file !== file));
  }, []);

  const onUploadComplete = useCallback((file: File) => {
    console.log(file);
  }, []);

  return (
    <section className="container">
      <div
        {...getRootProps({
          className:
            'w-full rounded-lg bg-muted border-2 border-dashed border-gray-300 p-8 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
        })}
      >
        <FilesIcon className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 block text-sm font-semibold text-muted-foreground dark:text-white">
          Drag and drop some files here, or click to select files
        </p>
        <input {...getInputProps()} />
      </div>
      <div>
        {files.map(({ file, id }) => (
          <UploadingFile
            key={id}
            file={file}
            onCancel={onCancel}
            onUploadComplete={onUploadComplete}
          />
        ))}
      </div>
    </section>
  );
}
