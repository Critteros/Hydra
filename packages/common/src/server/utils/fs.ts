import { findWorkspaceDir } from '@pnpm/find-workspace-dir';

export async function findWorkspaceRoot() {
  return Promise.resolve(__dirname);
}
