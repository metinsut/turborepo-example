/* eslint-disable sort-keys-fix/sort-keys-fix */
// @ts-nocheck
/* eslint import/no-named-as-default-member: 0 */
import { PaletteColorOptions } from '@mui/material';
import palette from '../../colors/palette';
import shadows from '../shadows';

// TODO: Since gradients don't support transition, solid colors are used here

const createDefaultColor = (color: PaletteColorOptions, _gradient: PaletteColorOptions) => ({
  '& .MuiSvgIcon-root': {
    // background: _gradient[100],
    background: color[100],
    transition: 'all 0.3s ease-out'
  },
  '&.contained': {
    // background: _gradient[100]
    background: color[100]
  },
  color: color.main,
  transition: 'all 0.3s ease-out'
});

const createHoverColor = (color: PaletteColorOptions, _gradient: PaletteColorOptions) => ({
  '& .MuiSvgIcon-root': {
    background: palette.lightGrey[800],
    color: color.main,
    boxShadow: shadows[2]
  },
  '&.contained': {
    background: color[800]
    // backgroundColor: gradient ? null : color.main,
  },
  color: palette.lightGrey.main
});

const createDisabledColor = () => ({
  '& .MuiSvgIcon-root': {
    background: 'none'
  },
  color: palette.darkGrey[100],
  backgroundColor: palette.lightGrey[600]
});

const createLightColor = () => ({
  color: '#FFF',
  '&.contained': {
    backgroundColor: palette.lightGrey[100]
  },
  transition: 'all 0.3s ease-out'
});

const createLightHoverColor = (color: PaletteColorOptions) => ({
  color: color.main,
  '&.contained': {
    backgroundColor: palette.lightGrey[800]
  }
});

export default {
  '.MuiSvgIcon-root': {
    borderRadius: 200,
    '&.colorLightBlue': createLightColor(),
    '&.colorLightGrey': createLightColor(),
    '&.colorLightGreen': createLightColor(),
    '&.colorLightOrange': createLightColor(),
    '&.colorLightRed': createLightColor(),
    '&.colorLightYellow': createLightColor()
  },
  '.MuiSvgIcon-root.hoverable:hover, .alwaysHovered': {
    '&.colorLightBlue': createLightHoverColor(palette.blue),
    '&.colorLightGrey': createLightHoverColor(palette.darkGrey),
    '&.colorLightGreen': createLightHoverColor(palette.green),
    '&.colorLightOrange': createLightHoverColor(palette.orange),
    '&.colorLightRed': createLightHoverColor(palette.red),
    '&.colorLightYellow': createLightHoverColor(palette.yellow)
  },
  '.MuiButton-root, .MuiSvgIcon-root': {
    '&.colorBlue': createDefaultColor(palette.blue, palette.blueGradient),
    '&.colorDarkGrey': createDefaultColor(palette.darkGrey, palette.greyGradient),
    '&.colorGreen': createDefaultColor(palette.green, palette.greenGradient),
    '&.colorOrange': createDefaultColor(palette.orange, palette.orangeGradient),
    '&.colorRed': createDefaultColor(palette.red, palette.redGradient),
    '&.colorYellow': createDefaultColor(palette.yellow, palette.yellowGradient),
    '&.colorGrey': createDefaultColor(palette.lightGrey, palette.greyGradient)
  },
  '.MuiButton-root:hover, .MuiSvgIcon-root.hoverable:hover, .alwaysHovered': {
    '&.colorBlue': createHoverColor(palette.blue, palette.blueGradient),
    '&.colorDarkGrey': createHoverColor(palette.darkGrey),
    '&.colorGreen': createHoverColor(palette.green, palette.greenGradient),
    '&.colorOrange': createHoverColor(palette.orange, palette.orangeGradient),
    '&.colorRed': createHoverColor(palette.red, palette.redGradient),
    '&.colorYellow': createHoverColor(palette.yellow, palette.yellowGradient),
    '&.colorGrey': createHoverColor(palette.lightGrey, palette.greyGradient)
  },
  '.Mui-disabled.MuiButton-root, .Mui-disabled .MuiSvgIcon-root': {
    '&.colorBlue': createDisabledColor(),
    '&.colorDarkGrey': createDisabledColor(),
    '&.colorGreen': createDisabledColor(),
    '&.colorOrange': createDisabledColor(),
    '&.colorRed': createDisabledColor(),
    '&.colorYellow': createDisabledColor()
  },
  'body iframe:last-child': {
    display: 'none'
  }
};
