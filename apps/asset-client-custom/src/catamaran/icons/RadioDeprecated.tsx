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

function RadioIcon(props: SvgIconProps) {
  const classes = useStyles();
  const { className, ...rest } = props;

  return (
    <SvgIcon className={clsx(className, classes.root)} {...rest} fill="none" viewBox="0 0 12 12">
      <rect
        height={10}
        opacity={0.6}
        rx={5}
        stroke="currentColor"
        strokeWidth={2}
        width={10}
        x={1}
        y={1}
      />
      <rect fill="currentColor" height={4} opacity={0.2} rx={2} width={4} x={4} y={4} />
    </SvgIcon>
  );
}

export default RadioIcon;
