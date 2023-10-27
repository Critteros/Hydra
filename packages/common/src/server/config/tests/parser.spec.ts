import { resolve } from 'node:path';
import { cwd } from 'node:process';

import mock from 'mock-fs';

import { FileNotFound } from '@/server/errors';

import { defaultConfig } from '../default';
import { HydraConfig, BadConfigFormat } from '../parser';
import type { Config } from '../schema';

describe('Test HydraConfig', () => {
  afterEach(() => {
    mock.restore();
  });

  it('provides default config on construction', () => {
    expect(new HydraConfig().config).toEqual(defaultConfig);
  });

  it('throws exception when file does not exist', async () => {
    mock({});
    await expect(() => HydraConfig.fromFile('test')).rejects.toThrowError(FileNotFound);
  });

  it('returns a new instance when fromFile is called', async () => {
    const contents = `
    socket:
      path: '/tmp/sockets/file'
      enabled: false
    `;
    mock({
      'hydra-config.yaml': contents,
    });
    const config = await HydraConfig.fromFile('hydra-config.yaml');
    expect(config).toBeInstanceOf(HydraConfig);
    expect(config.config).toEqual({
      socket: {
        enable: true,
        path: '/tmp/sockets/file',
      },
    } satisfies Config);
  });

  it('combines config with default config', async () => {
    const contents = `
    socket:
      enable: false
    `;
    mock({
      'hydra-config.yaml': contents,
    });
    const config = await HydraConfig.fromFile('hydra-config.yaml');
    expect(config).toBeInstanceOf(HydraConfig);
    expect(config.config).toEqual({
      socket: {
        enable: false,
        path: defaultConfig.socket.path,
      },
    } satisfies Config);
  });

  it('throws exception on invalid config', async () => {
    const contents = `
    asdasd
    ;;;;;;
    `;
    mock({
      'hydra-config.yaml': contents,
    });
    await expect(() => HydraConfig.fromFile('hydra-config.yaml')).rejects.toThrowError(
      BadConfigFormat,
    );
  });

  it('transforms socket path from relative', async () => {
    const contents = `
    socket:
      path: hydra.sock
    `;
    mock({
      config: {
        'hydra-config.yml': contents,
      },
    });
    const {
      config: {
        socket: { path },
      },
    } = await HydraConfig.fromFile('config/hydra-config.yml');
    expect(path).toBe(resolve(cwd(), 'config/hydra.sock'));
  });

  it('absolute socket path is not transformed', async () => {
    const contents = `
    socket:
      path: /run/hydra.sock
    `;
    mock({
      config: {
        'hydra-config.yml': contents,
      },
    });
    const {
      config: {
        socket: { path },
      },
    } = await HydraConfig.fromFile('config/hydra-config.yml');

    expect(path).toBe('/run/hydra.sock');
  });
});
