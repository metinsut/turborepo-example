import { SvgIcon, SvgIconProps, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '&.MuiSvgIcon-root': {
      borderRadius: 'unset'
    },
    fill: 'none'
  }
}));

function CheckboxIcon(props: SvgIconProps) {
  const classes = useStyles();
  const { className, ...rest } = props;

  return (
    <SvgIcon className={clsx(className, classes.root)} {...rest} viewBox="0 0 12 12">
      <rect
        fill="white"
        height="10"
        opacity="0.6"
        rx="3"
        stroke="#494949"
        strokeWidth="2"
        width="10"
        x="1"
        y="1"
      />
    </SvgIcon>
  );
}

export default CheckboxIcon;
