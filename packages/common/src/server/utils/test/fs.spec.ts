import * as pnpmLib from '@pnpm/find-workspace-dir';
import { relative } from 'node:path';

import { findWorkspaceRoot } from '../fs';

describe('Test find workspace root', () => {
  it('should find workspace root', async () => {
    const root = await findWorkspaceRoot();
    const fileLocation = 'packages/common/src/server/utils/test';
    expect(relative(root, __dirname)).toBe(fileLocation);
  });
  it('throws error when workspace root cannot be found', async () => {
    jest.spyOn(pnpmLib, 'findWorkspaceDir').mockResolvedValue(undefined);
    await expect(() => findWorkspaceRoot()).rejects.toThrowError(Error);
  });
});
