import { Box } from 'catamaran/core';
import { Divider, Skeleton, Theme, makeStyles } from 'catamaran/core/mui';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: theme.palette.greenGradient[100],
    borderRadius: theme.spacing(2)
  }
}));

type Props = {
  className?: string;
};

function AddButtonSkeleton(props: Props) {
  const classes = useStyles();
  const { className } = props;

  return (
    <Box
      center
      className={clsx(classes.root, className)}
      flex
      height={104}
      marginBottom={1}
      marginRight={1}
      width={224}
    >
      <Box flex flexDirection="row" flexGrow={1}>
        <Box flex flexDirection="column" mx={1}>
          <Skeleton height="24px" variant="circular" width="24px" />
          <Box my={1}>
            <Divider />
          </Box>
          <Skeleton height="24px" variant="circular" width="24px" />
        </Box>
        <Box flex flexDirection="column" flexGrow={1} justifyContent="center" marginRight={3}>
          <Skeleton width={70} />
          <Box py="2px" />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </Box>
      </Box>
    </Box>
  );
}

export default AddButtonSkeleton;
