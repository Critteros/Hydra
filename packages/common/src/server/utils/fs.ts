import { access, constants, unlink, lstat } from 'node:fs/promises';
import { resolve, basename, extname } from 'node:path';

import { findWorkspaceDir } from '@pnpm/find-workspace-dir';

/** Finds the monorepo root directory */
export async function findWorkspaceRoot() {
  const root = await findWorkspaceDir(__dirname);
  if (!root) throw new Error('Could not find workspace root');
  return root;
}

export async function resolveAccessibleFilePaths(paths: string[]): Promise<Array<string | null>> {
  const mask = constants.F_OK | constants.R_OK;
  const promises = paths.map(async (path) => {
    try {
      await access(path, mask);
      return path;
    } catch {
      return null;
    }
  });
  const results = await Promise.all(promises);
  const readablePaths = results.filter(Boolean) as string[];
  return readablePaths.map((path) => resolve(path));
}

export class UnixSocket {
  constructor(public path: string) {}

  /**
   * Obtains the socket file by deleting it if it exists Will throw an error if the path exists but
   * is not a socket file WARNING: This method does not create the socket file
   */
  async obtain() {
    const stat = await lstat(this.path).catch(() => null);
    if (stat?.isDirectory()) {
      throw new Error('Expected socket file but found directory');
    }

    if (stat?.isFile() && !stat.isSocket()) {
      throw new Error('Expected socket file but found regular file');
    }
    // Delete the socket file if it exists
    stat &&
      (await unlink(this.path).catch(() => {
        throw new Error('Could not delete socket file');
      }));

    return this;
  }
}
export function getModuleName(filename: string) {
  return basename(filename, extname(filename));
}

export const m = getModuleName;
