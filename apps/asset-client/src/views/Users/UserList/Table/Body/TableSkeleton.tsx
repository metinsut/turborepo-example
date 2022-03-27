import { Skeleton, TableCell, TableRow, makeStyles, styled } from 'catamaran/core/mui';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
  skeletonTable: {
    height: '48px'
  },
  skeletonText: {
    borderRadius: '16px',
    transform: 'inherit'
  }
}));

const NoBorderCell = styled(TableCell)(() => ({
  borderBottom: 'none'
}));

type Props = {
  className?: string;
};

const TableSkeleton = (props: Props) => {
  const classes = useStyles();
  const { className } = props;

  return (
    <TableRow className={clsx(className, classes.skeletonTable)}>
      <NoBorderCell />
      <NoBorderCell>
        <Skeleton className={classes.skeletonText} />
      </NoBorderCell>
      <NoBorderCell>
        <Skeleton className={classes.skeletonText} />
      </NoBorderCell>
      <NoBorderCell>
        <Skeleton className={classes.skeletonText} />
      </NoBorderCell>
      <NoBorderCell>
        <Skeleton className={classes.skeletonText} />
      </NoBorderCell>
      <NoBorderCell>
        <Skeleton className={classes.skeletonText} />
      </NoBorderCell>
      <NoBorderCell>
        <Skeleton className={classes.skeletonText} />
      </NoBorderCell>
      <NoBorderCell>
        <Skeleton className={classes.skeletonText} />
      </NoBorderCell>
      <NoBorderCell>
        <Skeleton className={classes.skeletonText} />
      </NoBorderCell>
    </TableRow>
  );
};

export default TableSkeleton;
