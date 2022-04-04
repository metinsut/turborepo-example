import { Paper, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    color: '#FFF',
    fontSize: '9px',
    padding: theme.spacing(0.2, 1)
  },
  root: {
    backgroundColor: '#494949',
    borderRadius: theme.spacing(1),
    marginLeft: '2px',
    opacity: 0.5
  }
}));

type Props = {
  className?: string;
  count?: number;
};

function CountBadge(props: Props) {
  const classes = useStyles();
  const { className, count } = props;

  return (
    <Paper className={clsx(classes.root, className)}>
      <Typography className={classes.content}>{count}</Typography>
    </Paper>
  );
}

export default CountBadge;
