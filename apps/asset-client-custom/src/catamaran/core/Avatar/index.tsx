import { Avatar as MuiAvatar, AvatarProps as MuiAvatarProps, Theme } from '@mui/material';
import { Palette, PaletteColor } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import React, { useMemo } from 'react';
import clsx from 'clsx';

type StyleProps = {
  color: string;
};

const useStyles = (props: StyleProps) =>
  makeStyles((theme: Theme) => ({
    border: {
      borderColor: theme.palette.lightGrey[800],
      borderStyle: 'solid'
    },
    root: {
      '&.Avatar-large': {
        borderWidth: '2px',
        fontSize: '14px',
        height: '32px',
        lineHeight: '16.8px',
        width: '32px'
      },
      '&.Avatar-medium': {
        borderWidth: '1.5px',
        fontSize: '10px',
        height: '24px',
        lineHeight: '12px',
        width: '24px'
      },
      '&.Avatar-small': {
        borderWidth: '1px',
        fontSize: '6px',
        height: '16px',
        lineHeight: '7.2px',
        width: '16px'
      },
      '&.Avatar-xLarge': {
        borderWidth: '3px',
        fontSize: '24px',
        height: '96px',
        lineHeight: '28.8px',
        width: '96px'
      },
      background: (theme.palette[props.color as keyof Palette] as PaletteColor)[800],
      letterSpacing: '0em'
    }
  }));

export type AvatarProps = MuiAvatarProps & {
  color?: Colors;
  size?: 'small' | 'medium' | 'large' | 'xLarge';
};

type Colors =
  | 'blueGradient'
  | 'redGradient'
  | 'greenGradient'
  | 'orangeGradient'
  | 'yellowGradient'
  | 'darkGrey';
const colors: Colors[] = [
  'blueGradient',
  'redGradient',
  'greenGradient',
  'orangeGradient',
  'yellowGradient',
  'darkGrey'
];

function Avatar(props: AvatarProps) {
  const { color, children, className, size = 'large', style, ...rest } = props;

  const randomColor = useMemo(() => {
    const calculatedColor = color ?? colors[Math.floor(Math.random() * colors.length)];
    return calculatedColor;
  }, [color]);

  const classes = useStyles({ color: randomColor })();

  return (
    <MuiAvatar
      className={clsx({
        [classes.border]: true,
        [classes.root]: true,
        [className]: true,
        [`Avatar-${size}`]: true
      })}
      style={style}
      {...rest}
    >
      {children}
    </MuiAvatar>
  );
}

export default Avatar;
