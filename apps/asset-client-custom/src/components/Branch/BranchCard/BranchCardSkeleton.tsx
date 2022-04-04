import { Box } from 'catamaran/core';
import { Theme, makeStyles } from 'catamaran/core/mui';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.darkGrey[100],
    border: '1px solid rgba(73, 73, 73, 0.1)',
    borderRadius: theme.spacing(2),
    height: 56,
    width: 197
  }
}));

type Props = {
  className?: string;
};

function BranchCardSkeleton(props: Props) {
  const classes = useStyles();
  const { className } = props;

  return <Box className={clsx(classes.root, className)} />;
}

export default BranchCardSkeleton;
