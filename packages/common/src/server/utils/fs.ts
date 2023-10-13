import { findWorkspaceDir } from '@pnpm/find-workspace-dir';
import { access, constants } from 'node:fs/promises';
import { resolve } from 'node:path';

/**
 * Finds the monorepo root directory
 */
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
    } catch (e) {
      return null;
    }
  });
  const results = await Promise.all(promises);
  const readablePaths = results.filter(Boolean) as string[];
  return readablePaths.map((path) => resolve(path));
}
