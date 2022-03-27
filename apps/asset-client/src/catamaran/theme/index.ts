import { adaptV4Theme, createTheme } from '@mui/material';
import breakpoints from './breakpoints';
import overrides from './overrides';
import palette from '../colors/palette';
import shadows from './shadows';
import typography from './typography';

const baseTheme = {
  breakpoints,
  overrides,
  palette,
  shadows,
  typography
};

const theme = createTheme(adaptV4Theme(baseTheme));

// default export which is the theme.
export default theme;
