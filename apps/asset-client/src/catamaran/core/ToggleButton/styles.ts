/* eslint-disable sort-keys-fix/sort-keys-fix */
// @ts-nocheck
/* eslint import/no-named-as-default-member: 0 */
import { PaletteColorOptions } from '@mui/material';
import { makeStyles } from '@mui/styles';
import palette from '../../colors/palette';
import shadows from 'catamaran/theme/shadows';

const createDefaultColor = (gradient: PaletteColorOptions, color: PaletteColorOptions) => ({
  background: color[100],
  boxShadow: `0 0 0 1px ${color[200]}`,
  '&.MuiToggleButton-sizeLarge:not(.Mui-selected)': {
    boxShadow: `0 0 0 2px ${color[200]}`
  },
  '&:not(.keepIconColorClass) .MuiSvgIcon-root': {
    background: color[100],
    color: color[800]
  }
});

const createHoverColor = (gradient: PaletteColorOptions, color: PaletteColorOptions) => ({
  background: color[100],
  boxShadow: `0 0 0 1px ${color[600]}`,
  '&.MuiToggleButton-sizeLarge:not(.Mui-selected)': {
    boxShadow: `0 0 0 2px ${color[600]}`
  },
  '&:not(.keepIconColorClass) .MuiSvgIcon-root': {
    background: color[800],
    color: palette.lightGrey[800],
    boxShadow: shadows[2]
  }
});

const createSelectedColor = (gradient: PaletteColorOptions, color: PaletteColorOptions) => ({
  background: color[800],
  boxShadow: 'none',
  '&:not(.keepIconColorClass) .MuiSvgIcon-root': {
    backgroundColor: palette.lightGrey[200],
    color: palette.lightGrey[800]
  }
});

const createDisabledColor = (gradient: PaletteColorOptions, color: PaletteColorOptions) => ({
  background: color[600],
  boxShadow: 'none',
  '&:not(.keepIconColorClass) .MuiSvgIcon-root': {
    backgroundColor: palette.lightGrey[100],
    color: palette.lightGrey[600]
  }
});

const createSelectedHoverColor = (gradient: PaletteColorOptions, color: PaletteColorOptions) => ({
  background: color[800],
  boxShadow: 'none',
  '&:not(.keepIconColorClass) .MuiSvgIcon-root': {
    background: palette.lightGrey[800],
    color: color[800]
  }
});

// MuiButtonBase-root is used for higher specificity
// this way it overrides the default MuiToggleButton css
export const useStyles = makeStyles(() => ({
  root: {
    '& .MuiToggleButton-title': {
      textTransform: 'none'
    },
    '& .MuiToggleButton-subtitle': {
      textTransform: 'none'
    },
    '&.MuiToggleButton-root.MuiButtonBase-root': {
      border: 'none',
      transition: 'all 0.3s ease-out',
      '& .MuiSvgIcon-root': {
        transition: 'all 0.3s ease-out'
      },
      '&.colorBlue': createDefaultColor(palette.blueGradient, palette.blue),
      '&.colorDarkGrey': createDefaultColor(palette.darkGrey, palette.darkGrey),
      '&.colorGrey': createDefaultColor(palette.greyGradient, palette.normalGrey),
      '&.colorGreen': createDefaultColor(palette.greenGradient, palette.green),
      '&.colorOrange': createDefaultColor(palette.orangeGradient, palette.orange),
      '&.colorRed': createDefaultColor(palette.redGradient, palette.red),
      '&.colorYellow': createDefaultColor(palette.yellowGradient, palette.yellow),
      '&.small': {
        width: '96px',
        height: '24px',
        '& .MuiSvgIcon-root': {
          width: '16px',
          height: '16px'
        }
      },
      '&.medium': {
        width: '112px',
        height: '32px'
      },
      '&.large': {
        width: '100%',
        height: '40px'
      },
      '&.xLarge': {
        width: '128px',
        height: '64px',
        '& .MuiSvgIcon-root': {
          alignSelf: 'flex-end'
        }
      },
      '& .MuiToggleButton-title': {
        opacity: 0.6
      },
      '& .MuiToggleButton-subtitle': {
        opacity: 0.8
      }
    },
    '&.MuiToggleButton-root.Mui-selected.MuiButtonBase-root': {
      '&.colorBlue': createSelectedColor(palette.blueGradient, palette.blue),
      '&.colorDarkGrey': createSelectedColor(palette.darkGrey, palette.darkGrey),
      '&.colorGrey': createSelectedColor(palette.greyGradient, palette.normalGrey),
      '&.colorGreen': createSelectedColor(palette.greenGradient, palette.green),
      '&.colorOrange': createSelectedColor(palette.orangeGradient, palette.orange),
      '&.colorRed': createSelectedColor(palette.redGradient, palette.red),
      '&.colorYellow': createSelectedColor(palette.yellowGradient, palette.yellow),
      '& .MuiToggleButton-title': {
        color: palette.lightGrey.main,
        fontWeight: 700,
        opacity: 1
      },
      '& .MuiToggleButton-subtitle': {
        color: palette.lightGrey.main,
        opacity: 1,
        fontWeight: 500
      }
    },
    '&.MuiToggleButton-root.Mui-disabled.MuiButtonBase-root': {
      '&.colorDarkGrey': createDisabledColor(palette.lightGrey, palette.lightGrey),
      '& .MuiToggleButton-title': {
        color: palette.darkGrey.main,
        fontWeight: 400,
        opacity: 0.4
      },
      '& .MuiToggleButton-subtitle': {
        color: palette.darkGrey.main,
        opacity: 0.4,
        fontWeight: 300
      }
    },
    '&.MuiToggleButton-root:hover.Mui-selected.MuiButtonBase-root': {
      '&.colorBlue': createSelectedHoverColor(palette.blueGradient, palette.blue),
      '&.colorDarkGrey': createSelectedHoverColor(palette.darkGrey, palette.darkGrey),
      '&.colorGrey': createSelectedHoverColor(palette.greyGradient, palette.normalGrey),
      '&.colorGreen': createSelectedHoverColor(palette.greenGradient, palette.green),
      '&.colorOrange': createSelectedHoverColor(palette.orangeGradient, palette.orange),
      '&.colorRed': createSelectedHoverColor(palette.redGradient, palette.red),
      '&.colorYellow': createSelectedHoverColor(palette.yellowGradient, palette.yellow),
      '& .MuiToggleButton-title': {
        color: palette.lightGrey.main,
        opacity: 1
      },
      '& .MuiToggleButton-subtitle': {
        color: palette.lightGrey.main,
        opacity: 1
      }
    },
    '&.MuiToggleButton-root:hover.MuiButtonBase-root': {
      '&.colorBlue': createHoverColor(palette.blueGradient, palette.blue),
      '&.colorDarkGrey': createHoverColor(palette.darkGrey, palette.darkGrey),
      '&.colorGrey': createHoverColor(palette.greyGradient, palette.normalGrey),
      '&.colorGreen': createHoverColor(palette.greenGradient, palette.green),
      '&.colorOrange': createHoverColor(palette.orangeGradient, palette.orange),
      '&.colorRed': createHoverColor(palette.redGradient, palette.red),
      '&.colorYellow': createHoverColor(palette.yellowGradient, palette.yellow),
      '& .MuiToggleButton-title': {
        opacity: 0.8
      },
      '& .MuiToggleButton-subtitle': {
        opacity: 1
      }
    }
  }
}));
