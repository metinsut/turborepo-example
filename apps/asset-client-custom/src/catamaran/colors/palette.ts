import { Color, colors } from '@mui/material';
import { PaletteColor, PaletteOptions } from '@mui/material/styles';
import fadeColor from './fadeColor';

const opacityCalculator = (color: string): Partial<Color> => ({
  100: fadeColor(color, 0.1),
  200: fadeColor(color, 0.2),
  300: fadeColor(color, 0.3),
  400: fadeColor(color, 0.4),
  500: fadeColor(color, 0.5),
  600: fadeColor(color, 0.6),
  700: fadeColor(color, 0.7),
  800: fadeColor(color, 0.8),
  900: fadeColor(color, 0.9)
});

const buildGradient = (start: string, end: string, opacity: number) =>
  `linear-gradient(180deg, ${fadeColor(start, opacity)} 0%, ${fadeColor(end, opacity)} 100%)`;

const buildGradientWithOpacity = (start: string, end: string): Partial<PaletteColor> => ({
  100: buildGradient(start, end, 0.1),
  200: buildGradient(start, end, 0.2),
  300: buildGradient(start, end, 0.3),
  400: buildGradient(start, end, 0.4),
  500: buildGradient(start, end, 0.5),
  600: buildGradient(start, end, 0.6),
  700: buildGradient(start, end, 0.7),
  800: buildGradient(start, end, 0.8),
  900: buildGradient(start, end, 0.9),
  main: buildGradient(start, end, 1)
});

export const lightGrey = '#F3F5F6';
export const darkGrey = '#494949';
export const grey = '#B8C4CB';
export const blue = '#69C9FF';
export const green = '#40DBA3';
export const red = '#E4756D';
export const orange = '#E5A071';
export const yellow = '#F3C932';

const white = '#FFFFFF';

const options: PaletteOptions = {
  background: {
    default: lightGrey,
    paper: white
  },
  blue: {
    main: blue,
    ...opacityCalculator(blue),
    contrastText: white
  },
  blueGradient: buildGradientWithOpacity('#69C9FF', '#78CFFF'),
  darkGrey: {
    main: darkGrey,
    ...opacityCalculator(darkGrey),
    contrastText: white
  },
  divider: colors.grey[200],
  error: {
    main: red,
    ...opacityCalculator(red),
    contrastText: white
  },
  green: {
    main: green,
    ...opacityCalculator(green),
    contrastText: white
  },
  greenGradient: buildGradientWithOpacity('#40DBA3', '#54DFAD'),
  greyGradient: buildGradientWithOpacity('#B8C4CB', '#ACB8BC'),
  icon: colors.blueGrey[600],
  info: {
    main: blue,
    ...opacityCalculator(blue),
    contrastText: white
  },
  lightGrey: {
    main: lightGrey,
    ...opacityCalculator(lightGrey),
    contrastText: white
  },
  link: colors.blue[800],
  normalGrey: {
    main: grey,
    ...opacityCalculator(grey),
    contrastText: white
  },
  orange: {
    main: orange,
    ...opacityCalculator(orange),
    contrastText: white
  },
  orangeGradient: buildGradientWithOpacity('#E5A071', '#E5A071'),
  primary: {
    contrastText: white,
    dark: '#3f9ecc',
    light: '#aeffff',
    main: '#69c9ff'
  },
  red: {
    main: red,
    ...opacityCalculator(red),
    contrastText: white
  },
  redGradient: buildGradientWithOpacity('#ED6E76', '#EC816A'),
  secondary: {
    contrastText: white,
    dark: '#b35451',
    light: '#ffb4ac',
    main: '#e8837d'
  },
  success: {
    main: green,
    ...opacityCalculator(green),
    contrastText: white
  },
  text: {
    primary: darkGrey,
    secondary: colors.blueGrey[600]
  },
  warning: {
    main: orange,
    ...opacityCalculator(orange),
    contrastText: white
  },
  yellow: {
    main: yellow,
    ...opacityCalculator(yellow),
    contrastText: white
  },
  yellowGradient: buildGradientWithOpacity('#F3BF32', '#F5C850')
};

export default options;
