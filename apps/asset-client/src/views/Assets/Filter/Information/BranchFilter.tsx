import { Box } from 'catamaran/core';
import { selectAllBranches } from 'store/slices/branches';
import { selectDraftFilterInformationBranches } from 'store/slices/asset/filter/selectors';
import { setFilterInformationBranchIds } from 'store/slices/asset/filter/slice';
import { useTypedDispatch } from 'hooks';
import { useTypedSelector } from 'hooks/useTypedSelector';
import MultipleBranchButton from 'layouts/Dashboard/components/MultipleBranchButton';
import React from 'react';
import clsx from 'clsx';

type Props = {
  className?: string;
};

function BranchFilter(props: Props) {
  const { className } = props;
  const branches = useTypedSelector(selectAllBranches);
  const dispatch = useTypedDispatch();

  const branchIds = useTypedSelector(selectDraftFilterInformationBranches);

  const handleBranchChange = React.useCallback(
    (branchIds: string[]) => {
      dispatch(setFilterInformationBranchIds(branchIds));
    },
    [dispatch]
  );

  return (
    <Box center className={clsx('w-full mb12', className)}>
      <MultipleBranchButton
        branches={branches}
        className="w-full"
        minOneBranch
        onBranchChange={handleBranchChange}
        selectedBranchIds={branchIds}
      />
    </Box>
  );
}

export default BranchFilter;
