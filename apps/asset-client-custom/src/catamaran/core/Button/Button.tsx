import { Button, ButtonProps as MuiButtonProps, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import LoadingIcon from '../../icons/Loading';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  disableTransform: {
    textTransform: 'none'
  },
  root: {
    '&:hover': {
      background: (props: StyleProps) => `${props.onHoverBackgroundColor} !important`
    },
    '&:not(:hover)': {
      background: (props: StyleProps) => `${props.backgroundColor} !important`
    },
    justifyContent: (props: StyleProps) =>
      props.endIcon || props.startIcon ? 'space-between' : 'center'
  }
}));

export type ColorTypes = 'blue' | 'green' | 'red' | 'orange' | 'darkGrey';

const colorCssClasses = {
  blue: 'colorBlue',
  darkGrey: 'colorDarkGrey',
  green: 'colorGreen',
  orange: 'colorOrange',
  red: 'colorRed'
};

export type ButtonProps = Omit<MuiButtonProps, 'color'> & {
  backgroundColor?: string;
  className?: string;
  color?: ColorTypes;
  loading?: boolean;
  onHoverBackgroundColor?: string;
  overflowThreeDot?: boolean;
  transformText?: boolean;
};

type StyleProps = {
  backgroundColor?: string;
  endIcon?: React.ReactNode;
  onHoverBackgroundColor?: string;
  startIcon?: React.ReactNode;
};

function CatButton(props: ButtonProps, ref: React.Ref<any>) {
  const {
    backgroundColor,
    children,
    className,
    color,
    disabled,
    endIcon,
    loading,
    onHoverBackgroundColor,
    overflowThreeDot = false,
    size = 'medium',
    startIcon,
    transformText,
    variant = 'contained',
    ...rest
  } = props;

  const classes = useStyles({
    backgroundColor,
    endIcon,
    onHoverBackgroundColor,
    startIcon
  });

  const finalEndIcon = endIcon && loading ? <LoadingIcon style={{ padding: '1px' }} /> : endIcon;

  const finalStartIcon =
    startIcon && loading ? <LoadingIcon style={{ padding: '1px' }} /> : startIcon;

  return (
    <Button
      className={clsx({
        'MuiButton-sizeMedium': size === 'medium',
        [classes.disableTransform]: transformText === false,
        [classes.root]: true,
        [className]: true,
        [colorCssClasses[color]]: true,
        contained: variant === 'contained',
        iconEnd: endIcon !== undefined,
        iconStart: startIcon !== undefined
      })}
      disabled={loading || disabled}
      disableElevation
      endIcon={finalEndIcon}
      ref={ref}
      size={size}
      startIcon={finalStartIcon}
      variant={variant}
      {...rest}
    >
      <span className={overflowThreeDot ? 'three-dot' : undefined}>{children}</span>
    </Button>
  );
}

export default React.forwardRef(CatButton);
