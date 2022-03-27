import { ColorPartial, Palette, PaletteColorOptions } from '@mui/material/styles';

declare module '@mui/material/styles/createPalette' {
  interface PaletteOptions {
    blue?: PaletteColorOptions;
    blueGradient?: PaletteColorOptions;
    darkGrey?: PaletteColorOptions;
    green?: PaletteColorOptions;
    greenGradient?: PaletteColorOptions;
    normalGrey?: PaletteColorOptions;
    greyGradient?: PaletteColorOptions;
    lightGrey?: PaletteColorOptions;
    link?: string;
    icon?: string;
    orange?: PaletteColorOptions;
    orangeGradient?: PaletteColorOptions;
    red?: PaletteColorOptions;
    redGradient?: PaletteColorOptions;
    yellow?: PaletteColorOptions;
    yellowGradient?: PaletteColorOptions;
  }
  interface Palette {
    blue?: PaletteColor;
    blueGradient?: PaletteColor;
    darkGrey?: PaletteColor;
    green?: PaletteColor;
    greenGradient?: PaletteColor;
    normalGrey?: PaletteColor;
    greyGradient?: PaletteColor;
    lightGrey?: PaletteColor;
    link?: string;
    icon?: string;
    orange?: PaletteColor;
    orangeGradient?: PaletteColor;
    red?: PaletteColor;
    redGradient?: PaletteColor;
    yellow?: PaletteColor;
    yellowGradient?: PaletteColor;
  }
  export interface PaletteColor
    extends Omit<ColorPartial, '50' | 'A100' | 'A200' | 'A400' | 'A700'> {}
}
