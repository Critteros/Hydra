import {
  YAML_CONFIG_HOME_SEARCH_PATHS,
  YAML_CONFIG_FILENAMES,
  YAML_CONFIG_SUPPORTED_EXTENSIONS,
} from '@/server/constants';
import { findWorkspaceRoot, resolveAccessibleFilePaths } from '@/server/utils/fs';
import { homedir } from 'node:os';
import { cwd } from 'node:process';

type ConfigType = 'HIDDEN' | 'STANDARD' | 'LOCAL';

export type ConfigResolverOptions = {
  search?: {
    home?: boolean;
    cwd?: boolean;
    workspaceRoot?: boolean;
  };
  hierarchy?: ConfigType[];
};

type PathMatrix = [string[], string[], string[]];
// The order is
// 1. LOCAL
// 2. HIDDEN
// 3. STANDARD
// LOCAL files are more important than HIDDEN files, which are more important than STANDARD files.
const defaultHierarchy = ['LOCAL', 'HIDDEN', 'STANDARD'] as const;

/**
 * @class
 * @name ConfigResolver
 * @description
 * This class is used to resolve config files.
 * It provides a default hierarchy, but it can be overwritten by passing a hierarchy array to the constructor.
 * The default hierarchy is:
 * 1. LOCAL (e.g. hydra-config.local.yaml)
 * 2. HIDDEN (e.g .hydra-config.yaml)
 * 3. STANDARD (e.g. hydra-config.yaml)
 * LOCAL files are more important than HIDDEN files, which are more important than STANDARD files.
 * Each of those three categories is searched in the following places (in order):
 * 1. The current working directory
 * 2. The workspace root (if it exists)
 * 3. The home directory
 * @param {ConfigResolverOptions} [options] - Options
 * @param {ConfigResolverOptions['search']} [options.search] - Search options
 * @param {boolean} [options.search.home] - Search home directory
 * @param {boolean} [options.search.cwd] - Search current working directory
 * @param {boolean} [options.search.workspaceRoot] - Search workspace root
 * @param {ConfigResolverOptions['hierarchy']} [options.hierarchy] - Hierarchy
 * @example
 * const resolver = new ConfigResolver();
 * const paths = await resolver.run();
 * console.log(paths);
 */
export class ConfigResolver {
  readonly searchOptions: Required<Exclude<ConfigResolverOptions['search'], undefined>>;
  readonly hierarchy: Required<ConfigResolverOptions>['hierarchy'];
  constructor(options?: ConfigResolverOptions) {
    const {
      hierarchy = defaultHierarchy.slice(),
      search: { home = true, cwd = true, workspaceRoot = true } = {},
    } = options ?? {};

    this.searchOptions = {
      home,
      cwd,
      workspaceRoot,
    };

    const cleanHierarchy = [] as ConfigType[];
    while (cleanHierarchy.length < 3) {
      const option = hierarchy.shift();

      if (option == undefined || cleanHierarchy.includes(option)) {
        let el = defaultHierarchy[cleanHierarchy.length]!;

        if (cleanHierarchy.includes(el)) {
          // Add first element that matches
          const hierarchyElementsNotIncluded = defaultHierarchy.filter(
            (el) => !cleanHierarchy.includes(el),
          );
          el = hierarchyElementsNotIncluded.at(0)!;
        }

        cleanHierarchy.push(el);
        continue;
      }

      cleanHierarchy.push(option);
    }

    this.hierarchy = cleanHierarchy;
  }

  async run(): Promise<string[]> {
    const paths = await this.collectPaths().then((res) => this.deduplicatePaths(res));
    return paths.flatMap((path) => path);
  }

  private async collectPaths(): Promise<PathMatrix> {
    const results = [] as Array<string[]>;
    const searchPaths = await this.getSearchPaths();

    const [localPaths, hiddenPaths, standardPaths] = await Promise.all([
      this.searchLocalFiles(searchPaths),
      this.searchHiddenFiles(searchPaths),
      this.searchStandardFiles(searchPaths),
    ]);

    results[this.hierarchy.indexOf('LOCAL')] = localPaths;
    results[this.hierarchy.indexOf('HIDDEN')] = hiddenPaths;
    results[this.hierarchy.indexOf('STANDARD')] = standardPaths;

    return results as PathMatrix;
  }

  private deduplicatePaths(pathMatrix: PathMatrix): PathMatrix {
    // Entries in first array are more important than entries in the second array
    pathMatrix[1] = pathMatrix[1].filter((path) => !pathMatrix[0].includes(path));
    pathMatrix[2] = pathMatrix[2].filter((path) => !pathMatrix[0].includes(path));
    pathMatrix[2] = pathMatrix[2].filter((path) => !pathMatrix[1].includes(path));
    return pathMatrix;
  }

  private async searchLocalFiles(searchPaths: string[]): Promise<string[]> {
    const configFilenames = YAML_CONFIG_FILENAMES.map((filename) => `${filename}.local`);
    const filenameWithExtension = configFilenames.flatMap((filename) =>
      YAML_CONFIG_SUPPORTED_EXTENSIONS.map((extension) => `${filename}${extension}`),
    );

    const toSearch = searchPaths.flatMap((path) =>
      filenameWithExtension.map((filename) => `${path}/${filename}`),
    );

    return (await resolveAccessibleFilePaths(toSearch)).filter(Boolean) as string[];
  }

  private async searchHiddenFiles(searchPaths: string[]): Promise<string[]> {
    const configFilenames = YAML_CONFIG_FILENAMES.map((filename) => `.${filename}`);
    const filenameWithExtension = configFilenames.flatMap((filename) =>
      YAML_CONFIG_SUPPORTED_EXTENSIONS.map((extension) => `${filename}${extension}`),
    );

    const toSearch = searchPaths.flatMap((path) =>
      filenameWithExtension.map((filename) => `${path}/${filename}`),
    );

    return (await resolveAccessibleFilePaths(toSearch)).filter(Boolean) as string[];
  }

  private async searchStandardFiles(searchPaths: string[]): Promise<string[]> {
    const configFilenames = YAML_CONFIG_FILENAMES.map((filename) => `${filename}`);
    const filenameWithExtension = configFilenames.flatMap((filename) =>
      YAML_CONFIG_SUPPORTED_EXTENSIONS.map((extension) => `${filename}${extension}`),
    );

    const toSearch = searchPaths.flatMap((path) =>
      filenameWithExtension.map((filename) => `${path}/${filename}`),
    );

    return (await resolveAccessibleFilePaths(toSearch)).filter(Boolean) as string[];
  }

  private async getSearchPaths(): Promise<string[]> {
    // The order is from most important to the least important
    const paths = [] as string[];

    if (this.searchOptions.cwd) {
      paths.push(cwd(), `${cwd()}/config`);
    }

    if (this.searchOptions.workspaceRoot) {
      try {
        const workspaceRoot = await findWorkspaceRoot();
        paths.push(workspaceRoot, `${workspaceRoot}/config`);
      } catch (e) {
        /* empty */
      }
    }

    if (this.searchOptions.home) {
      paths.push(...YAML_CONFIG_HOME_SEARCH_PATHS.map((path) => `${homedir()}${path}`));
    }

    return paths;
  }
}
