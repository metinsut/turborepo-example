import { Box } from 'catamaran/core';
import { Skeleton, TableCell, TableRow, styled } from 'catamaran/core/mui';
import React from 'react';
import clsx from 'clsx';

const StyledBigCheckboxSkeleton = styled(Skeleton)(() => ({
  alignSelf: 'center',
  borderRadius: '24px',
  height: '24px',
  transform: 'inherit',
  width: '24px'
}));

const StyledSmallCheckboxSkeleton = styled(Skeleton)(() => ({
  alignSelf: 'center',
  borderRadius: '14px',
  height: '14px',
  marginLeft: '10px',
  transform: 'inherit',
  width: '14px'
}));

type Props = {
  className?: string;
};

function AssetListSkeleton(props: Props) {
  const { className } = props;

  return (
    <TableRow className={clsx(className, 'h-48')}>
      <TableCell className="border-bottom-0 pb12" />
      <TableCell className="border-bottom-0 pb12">
        <Box flex flexDirection="row">
          <StyledBigCheckboxSkeleton />
          <StyledSmallCheckboxSkeleton />
          <StyledSmallCheckboxSkeleton />
        </Box>
      </TableCell>
      <TableCell className="border-bottom-0" component="th" scope="row">
        <Skeleton className="list-table-skeleton" />
      </TableCell>
      <TableCell className="border-bottom-0">
        <Skeleton className="list-table-skeleton" style={{ borderBottom: 'none' }} />
      </TableCell>
      <TableCell className="border-bottom-0">
        <Skeleton className="list-table-skeleton" />
      </TableCell>
      <TableCell className="border-bottom-0">
        <Skeleton className="list-table-skeleton" />
      </TableCell>
      <TableCell className="border-bottom-0">
        <Skeleton className="list-table-skeleton" />
      </TableCell>
    </TableRow>
  );
}

export default AssetListSkeleton;
