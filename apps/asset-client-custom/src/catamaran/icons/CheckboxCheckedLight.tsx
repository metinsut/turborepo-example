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

function CheckboxCheckedLightIcon(props: SvgIconProps) {
  const classes = useStyles();
  const { className, ...rest } = props;

  return (
    <SvgIcon className={clsx(className, classes.root)} {...rest} viewBox="0 0 14 14">
      <path
        d="M12.016 8.61v.406a3 3 0 01-3 3H4.734a3 3 0 01-3-3V4.734a3 3 0 013-3h3.354"
        opacity={0.6}
        stroke="#F3F5F6"
        strokeLinecap="round"
        strokeWidth={2}
      />
      <path
        d="M5 7l1.714 2L11 4"
        stroke="#F3F5F6"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </SvgIcon>
  );
}

export default CheckboxCheckedLightIcon;
