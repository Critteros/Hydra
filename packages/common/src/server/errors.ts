import { makeCustomError } from '../shared/errors';

export const FileNotFound = makeCustomError(
  'FileNotFound',
  (path: string) => `No such file "${path}"`,
);
