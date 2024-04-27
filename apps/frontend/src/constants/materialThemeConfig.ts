import { ThemeOptions, colors } from '@ease-trip/easy-ui';
const { green, purple } = colors;

/**
 * @description theme configuration for material ui
 * @link https://mui.com/material-ui/customization/theming/#createtheme-options-args-theme
 */
export const materialThemeConfig: ThemeOptions = {
  palette: {
    primary: { main: '#48C4C3' },
    secondary: { main: '#D9D9D9' },
    info: { main: '#6E6556' },
  },
};
