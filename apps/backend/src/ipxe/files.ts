import { v4 as uuid } from 'uuid';

export function uniqueFilename(originalFilename: string) {
  const uniqueId = uuid().replace(/-/g, '');
  const allowedCharacters = /[^a-zA-Z0-9-_.]/g;

  const sanitizedOriginalFilename = originalFilename.replace(allowedCharacters, '_').toLowerCase();
  const hasExtension = /\.([a-zA-Z0-9-_]+)$/.test(sanitizedOriginalFilename);
  if (!hasExtension) {
    // Remove the dot if there is no extension
    let originalFilenameTransformed = sanitizedOriginalFilename;
    while (originalFilenameTransformed.endsWith('.')) {
      originalFilenameTransformed = originalFilenameTransformed.slice(0, -1);
    }

    return `${uniqueId}-${originalFilenameTransformed}`;
  }
  const extension = sanitizedOriginalFilename.split('.').pop();
  const fileNameNoExtension = sanitizedOriginalFilename.replace(`.${extension}`, '');

  return `${uniqueId}-${fileNameNoExtension}.${extension}`;
}
