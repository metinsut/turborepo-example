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

function CheckboxCheckedIcon(props: SvgIconProps) {
  const classes = useStyles();
  const { className, ...rest } = props;

  return (
    <SvgIcon className={clsx(className, classes.root)} {...rest} viewBox="0 0 14 14">
      <path
        d="M12.25 8.77128V9.25C12.25 10.9069 10.9069 12.25 9.25 12.25H4.75C3.09315 12.25 1.75 10.9069 1.75 9.25V4.75C1.75 3.09315 3.09315 1.75 4.75 1.75H8.2387"
        stroke="#40DBA3"
        strokeLinecap="round"
        strokeWidth="2"
      />
      <path
        d="M5.08496 7.1278L6.83572 9.17035L11.2126 4.06396"
        stroke="#494949"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </SvgIcon>
  );
}

export default CheckboxCheckedIcon;
