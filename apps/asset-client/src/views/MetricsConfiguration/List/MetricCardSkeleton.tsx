import { CatPaper } from 'catamaran/core';
import { Skeleton } from 'catamaran/core/mui';
import React from 'react';

function MetricCardSkeleton() {
  return (
    <CatPaper className="flex align-items-center justify-content-between px24 py16">
      <div className="grid gap-2 align-items-center">
        <Skeleton height="18px" width="180px" />
        <Skeleton height="18px" width="140px" />
      </div>
      <div className="grid gap-2 align-items-center">
        <Skeleton height="18px" width="180px" />
        <Skeleton className="justify-self-end" height="18px" width="100px" />
      </div>
    </CatPaper>
  );
}

export default MetricCardSkeleton;
