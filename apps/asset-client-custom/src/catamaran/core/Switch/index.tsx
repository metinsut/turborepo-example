import { Switch, SwitchProps, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  checked: {},
  focusVisible: {},
  root: {
    borderRadius: '12.5px',
    height: 24,
    padding: 0,
    width: 48
  },
  switchBase: {
    '&$checked': {
      '& + $track': {
        background: theme.palette.blueGradient[100],
        border: `1px solid ${theme.palette.blue[200]}`
      },
      color: theme.palette.blue.main,
      transform: 'translateX(24px)'
    },
    color: theme.palette.darkGrey[400],
    padding: 0
  },
  thumb: {
    height: 24,
    width: 24
  },
  track: {
    background: theme.palette.darkGrey[100],
    border: 'none',
    borderRadius: '24px',
    transition: theme.transitions.create(['background-color'])
  }
}));

type Props = SwitchProps & {
  className?: string;
};

export const BordaSwitch = (props: Props, ref: React.Ref<any>) => {
  const classes = useStyles();
  const { className } = props;

  return (
    <Switch
      classes={{
        checked: classes.checked,
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track
      }}
      className={clsx(className, 'noStyling')}
      ref={ref}
      {...props}
    />
  );
};

export default React.forwardRef(BordaSwitch);
