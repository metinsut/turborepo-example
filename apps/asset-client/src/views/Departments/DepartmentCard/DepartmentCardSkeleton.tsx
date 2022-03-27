import { Box } from 'catamaran/core';
import { Theme, makeStyles } from 'catamaran/core/mui';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.darkGrey[100],
    borderRadius: theme.spacing(2),
    height: 272,
    width: 196
  }
}));

type Props = {
  className?: string;
};

function DepartmentCardSkeleton(props: Props) {
  const classes = useStyles();
  const { className } = props;

  return <Box className={clsx(classes.root, className)} />;
}

export default DepartmentCardSkeleton;
