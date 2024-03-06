import { ThemeOptions, colors } from '@ease-trip/easy-ui';
const { green, purple } = colors

/**
 * @description theme configuration for material ui
 * @link https://mui.com/material-ui/customization/theming/#createtheme-options-args-theme
 */
export const materialThemeConfig: ThemeOptions = {
  palette: {
    primary: { main: green[500] },
    secondary: { main: purple[500] },
  },
};
