import { Logger } from '@nestjs/common';

import { HydraConfig, ConfigResolver, type Config } from '@hydra-ipxe/common/server/config';
import { m } from '@hydra-ipxe/common/server/utils/fs';

export async function loadHydraConfig(): Promise<Config> {
  const logger = new Logger(`${m(__filename)}:${loadHydraConfig.name}`);
  logger.log('Loading hydra config for cli');

  const paths = await new ConfigResolver().run();
  logger.verbose(`Found ${paths.length} configuration files`);
  if (paths.length === 0) {
    logger.warn('No configuration files found. Using default configuration');
    return new HydraConfig().config;
  }
  logger.log(`Using ${paths[0]} as the primary configuration file`);

  return (await HydraConfig.fromFile(paths[0]!)).config;
}
