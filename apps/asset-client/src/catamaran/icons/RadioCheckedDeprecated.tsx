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

function RadioCheckedIcon(props: SvgIconProps) {
  const classes = useStyles();
  const { className, ...rest } = props;

  return (
    <SvgIcon className={clsx(className, classes.root)} {...rest} fill="none" viewBox="0 0 12 12">
      <rect fill="url(#prefix__paint0_linear_radiochecked)" height={12} rx={6} width={12} />
      <rect fill="#F3F5F6" height={6} rx={3} width={6} x={3} y={3} />
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="prefix__paint0_linear_radiochecked"
          x1={6}
          x2={6}
          y1={0}
          y2={12}
        >
          <stop stopColor="#40DBA3" />
          <stop offset={1} stopColor="#54DFAD" />
        </linearGradient>
      </defs>
    </SvgIcon>
  );
}

export default RadioCheckedIcon;
