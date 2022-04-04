import { Box } from 'catamaran/core';
import { ListItem, Skeleton, Theme, makeStyles } from 'catamaran/core/mui';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {}
}));

type Props = {
  className?: string;
};

function PersonDialogLoadingItem(props: Props) {
  const classes = useStyles();
  const { className } = props;

  return (
    <ListItem className={clsx(classes.root, className)} disableGutters>
      <Box center flex flexDirection="row" marginLeft="4px">
        <Skeleton height={32} variant="circular" width={32} />
        <Box flex flexDirection="column" pl={1}>
          <Skeleton height={20} variant="text" width={100} />
          <Skeleton height={18} variant="text" width={140} />
        </Box>
      </Box>
    </ListItem>
  );
}

export default PersonDialogLoadingItem;
