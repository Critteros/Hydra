import { Identity } from '@/utils/identity';

export const FILE_DISALLOWED_CHARACTERS = /[^a-z0-9-_.]/gi;

export function uniqueFilename(originalFilename: string, uid = Identity.compactUUID()) {
  const sanitizedOriginalFilename = originalFilename
    .replace(FILE_DISALLOWED_CHARACTERS, '_')
    .replace(/\.{2,}/g, '.') // Replace multiple dots with a single dot
    .replace(/\.$/, '') // Remove trailing dot
    .toLowerCase();

  return `${uid}-${sanitizedOriginalFilename}`;
}
