import { Logger } from '@nestjs/common';

import { HydraConfig, ConfigResolver } from '@hydra-ipxe/common/server/config';
import { m } from '@hydra-ipxe/common/server/utils/fs';

/**
 * Resolves and loads the configuration for the application
 * If multiple file paths are found, the first one is used
 */
export async function loadConfiguration() {
  const logger = new Logger(`${m(__filename)}:${loadConfiguration.name}`);
  logger.log('Preparing to load configuration...');

  const paths = await new ConfigResolver().run();
  logger.log(`Found ${paths.length} configuration files`);
  if (paths.length === 0) {
    logger.warn('No configuration files found. Using default configuration');
    return new HydraConfig().config;
  }
  logger.log(`Using ${paths[0]} as the primary configuration file`);

  return (await HydraConfig.fromFile(paths[0]!)).config;
}

export default loadConfiguration;
