/* eslint-disable */
import palette from './palette';

type mixedColorType = {
  gradient: any; // TODO by Soorena: can't set these to "PaletteColorOptions" and I can't figure out why.
  solid: any;
  name: string;
};

export type Colors = 'blue' | 'green' | 'orange' | 'red' | 'yellow' | 'darkGrey';

const colorMap: Record<Colors, mixedColorType> = {
  blue: {
    gradient: palette.blueGradient,
    solid: palette.blue,
    name: 'blue'
  },
  green: {
    gradient: palette.greenGradient,
    solid: palette.green,
    name: 'green'
  },
  darkGrey: {
    gradient: palette.darkGrey,
    solid: palette.darkGrey,
    name: 'darkGrey'
  },
  orange: {
    gradient: palette.orangeGradient,
    solid: palette.orange,
    name: 'orange'
  },
  red: {
    gradient: palette.redGradient,
    solid: palette.red,
    name: 'red'
  },
  yellow: {
    gradient: palette.yellowGradient,
    solid: palette.yellow,
    name: 'yellow'
  }
};

const map = (color: Colors) => colorMap[color];

export default map;
