export const YAML_CONFIG_FILENAMES = ['hydra', 'hydra-config', 'hydra.config'] as const;
export const YAML_CONFIG_SUPPORTED_EXTENSIONS = ['.yaml', '.yml'] as const;

// This array defines relative paths to search from the home directory
export const YAML_CONFIG_HOME_SEARCH_PATHS = ['', `.config/hydra`] as const;
