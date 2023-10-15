import * as pnpmLib from '@pnpm/find-workspace-dir';
import mock from 'mock-fs';
import { relative } from 'node:path';

import { findWorkspaceRoot, UnixSocket } from '../fs';

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

describe('Test UnixSocket', () => {
  it('holds path reference', () => {
    expect(new UnixSocket('/tmp/test.sock').path).toBe('/tmp/test.sock');
  });

  describe('Test obtain', () => {
    afterEach(() => {
      mock.restore();
    });

    it('throws error when path is a directory', async () => {
      mock(
        { '/tmp/': { 'test.sock': mock.directory() } },
        {
          createTmp: false,
        },
      );
      const socket = new UnixSocket('/tmp/test.sock');
      await expect(() => socket.obtain()).rejects.toThrowError(Error);
    });

    it('throws error when path is a regular file', async () => {
      mock(
        { '/tmp/': { 'test.sock': 'test' } },
        {
          createTmp: false,
        },
      );
      const socket = new UnixSocket('/tmp/test.sock');
      await expect(() => socket.obtain()).rejects.toThrowError(Error);
    });
  });
});
