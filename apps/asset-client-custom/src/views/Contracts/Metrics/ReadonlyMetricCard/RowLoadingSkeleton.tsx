import { Box } from 'catamaran/core';
import { Skeleton } from 'catamaran/core/mui';
import React from 'react';

function RowLoadingSkeleton() {
  return (
    <>
      <Box display="flex" flexDirection="row" py={1}>
        <Skeleton height={16} variant="circular" width={16} />
        <Box px="4px" />
        <Skeleton width={150} />
      </Box>
      <Box px={3}>
        <Skeleton />
        <Skeleton />
      </Box>
    </>
  );
}

export default RowLoadingSkeleton;
