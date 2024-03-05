import { ThemeOptions } from '@mui/material';
import { green, purple } from '@mui/material/colors';

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
