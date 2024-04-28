import { ThemeOptions } from '@ease-trip/easy-ui';

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
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
};
