import { Box } from 'catamaran/core';
import { Theme, Typography, makeStyles } from 'catamaran/core/mui';
import Check from 'catamaran/icons/Check';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  bigBox: {
    height: '22px',
    margin: theme.spacing(0, 0.5)
  },
  root: {
    background: theme.palette.greenGradient.main,
    borderRadius: theme.spacing(1),
    color: theme.palette.lightGrey.main
  },
  smallBox: {
    height: '16px'
  }
}));

type Props = {
  className?: string;
  count: number;
  size?: 'big' | 'small';
};

function SelectCounter(props: Props) {
  const classes = useStyles();
  const { className, count, size = 'big' } = props;
  if (!count) {
    return null;
  }

  return (
    <Box
      className={clsx(classes.root, className, size === 'big' ? classes.bigBox : classes.smallBox)}
    >
      <Box
        alignItems="center"
        flex
        flexDirection="row"
        height="100%"
        marginLeft="2px"
        marginRight="4px"
      >
        <Check
          color="lightGrey"
          contained={false}
          hoverable={false}
          style={{ height: '12px', opacity: 0.8, width: '12px' }}
        />
        <Typography style={{ color: 'white' }} variant={size === 'big' ? 'body2' : 'caption'}>
          {count}
        </Typography>
      </Box>
    </Box>
  );
}

export default SelectCounter;
