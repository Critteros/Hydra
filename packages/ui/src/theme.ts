import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

export const initialColorMode = 'dark';

const config: ThemeConfig = {
  initialColorMode,
  useSystemColorMode: false,
};
export const STORAGE_KEY = 'chakra-ui-color-mode';

const theme = extendTheme({ config });

export default theme;
