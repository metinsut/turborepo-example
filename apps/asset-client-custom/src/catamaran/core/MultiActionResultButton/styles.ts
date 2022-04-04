import { Theme } from '@mui/material';

import { makeStyles } from '@mui/styles';

type GradientType = 'redGradient' | 'greenGradient' | 'orangeGradient' | 'darkGrey';

const backgroundColors: { [key in ColorType]: GradientType } = {
  darkGrey: 'darkGrey',
  green: 'greenGradient',
  orange: 'orangeGradient',
  red: 'redGradient'
};

type StyleProps = {
  color: ColorType;
};

export type ColorType = 'red' | 'green' | 'orange' | 'darkGrey';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '&.MuiButton-root': {
      '& .MuiTypography-body1': {
        opacity: 0.6
      },
      '& .MuiTypography-subtitle1': {
        color: (props: StyleProps) =>
          props.color === 'green' ? theme.palette.darkGrey.main : theme.palette[props.color].main,
        opacity: 0.8
      },
      '& .MultiActionResultButton-startIcon .MuiSvgIcon-root': {
        backgroundColor: 'initial',
        color: (props: StyleProps) => theme.palette[props.color][400],
        marginRight: theme.spacing(1)
      },
      '&:hover': {
        '& .MuiSvgIcon-root:not(:hover)': {
          backgroundColor: theme.palette.lightGrey[100],
          color: theme.palette.lightGrey.main
        },
        '& .MuiTypography-root': {
          color: theme.palette.lightGrey.main
        },
        '& .MuiTypography-subtitle1': {
          opacity: 1
        },
        '& .MultiActionResultButton-mainAction': {
          '& .MuiSvgIcon-root': {
            backgroundColor: theme.palette.lightGrey[800],
            color: theme.palette.darkGrey[800]
          },
          pointerEvents: 'none'
        },
        '& .MultiActionResultButton-startIcon .MuiSvgIcon-root': {
          backgroundColor: 'initial',
          color: theme.palette.lightGrey[600]
        },
        '& .divider-vertical': {
          backgroundColor: theme.palette.lightGrey[800]
        },
        background: (props: StyleProps) => theme.palette[backgroundColors[props.color]][800],
        border: '1px solid transparent'
      },
      background: (props: StyleProps) => theme.palette[backgroundColors[props.color]][100],
      border: (props: StyleProps) => `1px solid ${theme.palette[props.color].main}`
    },
    borderRadius: '16px',
    height: '48px',
    padding: theme.spacing(0, 1),
    textAlign: 'unset',
    textTransform: 'none'
  }
}));

export default useStyles;
