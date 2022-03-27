import { selectActiveFilter } from 'store/slices/users/filter/selectors';
import { selectAllBranches } from 'store/slices/branches';
import { updateActiveFilter, updateBranchIds } from 'store/slices/users/filter/slice';
import { useTypedDispatch } from 'hooks';
import { useTypedSelector } from 'hooks/useTypedSelector';
import MultipleBranchButton from 'layouts/Dashboard/components/MultipleBranchButton';
import React from 'react';

const UsersBranchButton = () => {
  const dispatch = useTypedDispatch();
  const branches = useTypedSelector(selectAllBranches);
  const assetFilter = useTypedSelector(selectActiveFilter);

  const handleBranchChange = (branchIds: string[]) => {
    dispatch(updateBranchIds(branchIds));
    dispatch(updateActiveFilter());
  };

  return (
    <MultipleBranchButton
      branches={branches}
      minOneBranch
      onBranchChange={handleBranchChange}
      onHeader
      selectedBranchIds={assetFilter.branches}
    />
  );
};

export default UsersBranchButton;
