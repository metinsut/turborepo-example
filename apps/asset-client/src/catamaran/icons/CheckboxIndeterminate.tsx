import { SvgIcon, SvgIconProps, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '&.MuiSvgIcon-root': {
      borderRadius: 'unset'
    },
    fill: 'white'
  }
}));

function CheckboxIndeterminateIcon(props: SvgIconProps) {
  const classes = useStyles();
  const { className, ...rest } = props;

  return (
    <SvgIcon className={clsx(className, classes.root)} {...rest} viewBox="0 0 12 12">
      <rect
        fill="white"
        height="10"
        opacity="0.8"
        rx="3"
        stroke="#494949"
        strokeWidth="2"
        width="10"
        x="1"
        y="1"
      />
      <path d="M4 6H8" stroke="#494949" strokeLinecap="round" />
    </SvgIcon>
  );
}

export default CheckboxIndeterminateIcon;
