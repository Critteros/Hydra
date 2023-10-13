import * as constants from '@/server/constants';
import * as fsUtils from '@/server/utils/fs';
import mock from 'mock-fs';
import * as os from 'node:os';
import { cwd } from 'node:process';

import { ConfigResolver, type ConfigResolverOptions } from '../resolver';

jest.mock('node:os', () => ({
  ...jest.requireActual('node:os'),
  homedir: jest.fn(),
}));

const getPossibleConfigNames = () => {
  const standardConfigName = constants.YAML_CONFIG_FILENAMES;
  const hiddenConfigName = standardConfigName.map((name) => `.${name}`);
  const localConfigName = standardConfigName.map((name) => `${name}.local`);

  const withExtensions = (names: readonly string[]) =>
    names.flatMap((name) =>
      constants.YAML_CONFIG_SUPPORTED_EXTENSIONS.map((ext) => `${name}${ext}`),
    );

  return [
    ...withExtensions(standardConfigName),
    ...withExtensions(hiddenConfigName),
    ...withExtensions(localConfigName),
  ];
};

describe('Test ConfigResolver', () => {
  describe('hierarchy', () => {
    it('provides default hierarchy', () => {
      expect(new ConfigResolver().hierarchy).toEqual(['LOCAL', 'HIDDEN', 'STANDARD']);
    });

    it.each`
      value                              | expected
      ${['STANDARD', 'HIDDEN', 'LOCAL']} | ${['STANDARD', 'HIDDEN', 'LOCAL']}
      ${['STANDARD']}                    | ${['STANDARD', 'HIDDEN', 'LOCAL']}
      ${['LOCAL']}                       | ${['LOCAL', 'HIDDEN', 'STANDARD']}
      ${['HIDDEN']}                      | ${['HIDDEN', 'LOCAL', 'STANDARD']}
      ${['LOCAL', 'HIDDEN']}             | ${['LOCAL', 'HIDDEN', 'STANDARD']}
      ${['HIDDEN', 'LOCAL']}             | ${['HIDDEN', 'LOCAL', 'STANDARD']}
      ${['LOCAL', 'STANDARD']}           | ${['LOCAL', 'STANDARD', 'HIDDEN']}
      ${['STANDARD', 'LOCAL']}           | ${['STANDARD', 'LOCAL', 'HIDDEN']}
      ${['HIDDEN', 'STANDARD']}          | ${['HIDDEN', 'STANDARD', 'LOCAL']}
      ${['STANDARD', 'HIDDEN']}          | ${['STANDARD', 'HIDDEN', 'LOCAL']}
      ${[]}                              | ${['LOCAL', 'HIDDEN', 'STANDARD']}
    `(
      'hierarchy is $expected when passed $value',
      ({
        value,
        expected,
      }: {
        value: ConfigResolver['hierarchy'];
        expected: ConfigResolverOptions['hierarchy'];
      }) => {
        expect(new ConfigResolver({ hierarchy: value }).hierarchy).toEqual(expected);
      },
    );
  });
  describe('path resolution', () => {
    beforeEach(() => {
      jest
        .spyOn(fsUtils, 'findWorkspaceRoot')
        .mockImplementation(() => Promise.resolve('/workspace'));
      jest.spyOn(fsUtils, 'resolveAccessibleFilePaths');
      jest.spyOn(os, 'homedir').mockReturnValue('/homedir');
    });

    it('searches current working directory', async () => {
      await new ConfigResolver({
        search: {
          cwd: true,
          home: false,
          workspaceRoot: false,
        },
      }).run();
      expect(fsUtils.resolveAccessibleFilePaths).toHaveBeenCalledWith(
        expect.arrayContaining([expect.stringContaining(cwd())]),
      );
      expect(fsUtils.findWorkspaceRoot).not.toBeCalled();
      expect(fsUtils.resolveAccessibleFilePaths).not.toHaveBeenCalledWith(
        expect.arrayContaining([expect.stringContaining('/workspace')]),
      );
      expect(fsUtils.resolveAccessibleFilePaths).not.toHaveBeenCalledWith(
        expect.arrayContaining([expect.stringContaining('/homedir')]),
      );
      expect(os.homedir).not.toBeCalled();
    });

    it('searches home directory', async () => {
      await new ConfigResolver({
        search: {
          cwd: false,
          home: true,
          workspaceRoot: false,
        },
      }).run();
      expect(os.homedir).toBeCalled();
      expect(fsUtils.resolveAccessibleFilePaths).toHaveBeenCalledWith(
        expect.arrayContaining([expect.stringContaining('/homedir')]),
      );
      expect(fsUtils.resolveAccessibleFilePaths).not.toHaveBeenCalledWith(
        expect.arrayContaining([expect.stringContaining(cwd())]),
      );
      expect(fsUtils.findWorkspaceRoot).not.toBeCalled();
      expect(fsUtils.resolveAccessibleFilePaths).not.toHaveBeenCalledWith(
        expect.arrayContaining([expect.stringContaining('/workspace')]),
      );
    });

    it('searches workspace directory', async () => {
      await new ConfigResolver({
        search: {
          cwd: false,
          home: false,
          workspaceRoot: true,
        },
      }).run();
      expect(os.homedir).not.toBeCalled();
      expect(fsUtils.resolveAccessibleFilePaths).not.toHaveBeenCalledWith(
        expect.arrayContaining([expect.stringContaining('/homedir')]),
      );
      expect(fsUtils.resolveAccessibleFilePaths).not.toHaveBeenCalledWith(
        expect.arrayContaining([expect.stringContaining(cwd())]),
      );
      expect(fsUtils.findWorkspaceRoot).toBeCalledTimes(1);
      expect(fsUtils.resolveAccessibleFilePaths).toHaveBeenCalledWith(
        expect.arrayContaining([expect.stringContaining('/workspace')]),
      );
    });
  });

  describe('find paths for existing files', () => {
    const cwdDir = `${cwd()}/`;
    const workspaceDir = '/workspace/';
    const homeDir = '/homedir/';

    beforeEach(() => {
      (os.homedir as jest.Mock).mockReturnValue(homeDir);
      jest.spyOn(fsUtils, 'findWorkspaceRoot').mockResolvedValue(workspaceDir);
    });

    afterEach(() => {
      mock.restore();
    });

    it.each(getPossibleConfigNames().map((el) => [el]))(
      'finds %s config files in all locations',
      async (configName) => {
        mock(
          {
            [cwdDir]: {
              [configName]: configName,
            },
            [workspaceDir]: {
              [configName]: configName,
            },
            [homeDir]: {
              [configName]: configName,
            },
          },
          {
            createCwd: false,
          },
        );
        const paths = await new ConfigResolver().run();
        expect(paths).toEqual(
          expect.arrayContaining([
            `${homeDir}${configName}`,
            `${cwdDir}${configName}`,
            `${workspaceDir}${configName}`,
          ]),
        );
      },
    );

    it('resolves the correct order of configs', async () => {
      mock(
        {
          [cwdDir]: {
            'hydra-config.yaml': '',
            '.hydra-config.yaml': '',
            'hydra-config.local.yaml': '',
          },
          [workspaceDir]: {
            'hydra-config.yaml': '',
            '.hydra-config.yaml': '',
            'hydra-config.local.yaml': '',
          },
          [homeDir]: {
            'hydra-config.yaml': '',
            '.hydra-config.yaml': '',
            'hydra-config.local.yaml': '',
          },
        },
        {
          createCwd: false,
        },
      );

      const paths = await new ConfigResolver().run();

      expect(paths).toEqual([
        // Local files
        `${cwdDir}hydra-config.local.yaml`,
        `${workspaceDir}hydra-config.local.yaml`,
        `${homeDir}hydra-config.local.yaml`,

        // Hidden files
        `${cwdDir}.hydra-config.yaml`,
        `${workspaceDir}.hydra-config.yaml`,
        `${homeDir}.hydra-config.yaml`,

        // Standard files
        `${cwdDir}hydra-config.yaml`,
        `${workspaceDir}hydra-config.yaml`,
        `${homeDir}hydra-config.yaml`,
      ]);
    });
    // TODO: Add unit test for extra home dirs
  });
});
