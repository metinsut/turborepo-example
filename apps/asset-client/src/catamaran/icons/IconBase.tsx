import { SvgIcon, SvgIconProps, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    fill: 'none'
  }
}));

export type ColorTypes =
  | 'blue'
  | 'blueReversed'
  | 'lightBlue'
  | 'lightRed'
  | 'lightGreen'
  | 'lightGrey'
  | 'lightOrange'
  | 'green'
  | 'red'
  | 'yellow'
  | 'orange'
  | 'grey'
  | 'darkGrey'
  | 'darkRed';

const iconCssClasses = {
  blue: 'colorBlue',
  blueReversed: 'colorBlueReversed',
  darkGrey: 'colorDarkGrey',
  darkRed: 'colorDarkRed',
  green: 'colorGreen',
  grey: 'colorGrey',
  lightBlue: 'colorLightBlue',
  lightGreen: 'colorLightGreen',
  lightGrey: 'colorLightGrey',
  lightOrange: 'colorLightOrange',
  lightRed: 'colorLightRed',
  orange: 'colorOrange',
  red: 'colorRed',
  yellow: 'colorYellow'
};

export type IconBaseProps = Omit<SvgIconProps, 'color'> & {
  alwaysHovered?: boolean;
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  color?: ColorTypes;
  contained?: boolean;
  hoverable?: boolean;
  RenderIcon?: typeof SvgIcon;
};

function IconBase(props: IconBaseProps) {
  const classes = useStyles();
  const {
    alwaysHovered = false,
    className,
    containerClassName,
    children,
    color,
    contained = true,
    hoverable = true,
    fontSize = 'medium',
    RenderIcon,
    ...rest
  } = props;
  const Icon = RenderIcon ?? SvgIcon;
  return (
    <span
      className={clsx({
        [containerClassName ?? '']: true
      })}
      style={{ display: 'flex' }}
    >
      <Icon
        className={clsx({
          'MuiSvgIcon-fontSizeMedium': fontSize === 'medium',
          [classes.root]: true,
          [className ?? '']: true,
          alwaysHovered,
          [iconCssClasses[color]]: !!color,
          contained,
          hoverable
        })}
        fontSize={fontSize}
        {...rest}
      >
        {children}
      </Icon>
    </span>
  );
}

export default React.memo(IconBase);
