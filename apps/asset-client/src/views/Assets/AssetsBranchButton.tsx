import { selectActiveFilter } from 'store/slices/asset/filter/selectors';
import { selectAllBranches } from 'store/slices/branches';
import { setAllFilterBranchIds } from 'store/slices/asset/filter/slice';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import MultipleBranchButton from 'layouts/Dashboard/components/MultipleBranchButton';
import React from 'react';

type Props = {
  disabled?: boolean;
};

const AssetsBranchButton = (props: Props) => {
  const { disabled } = props;
  const dispatch = useTypedDispatch();
  const branches = useTypedSelector(selectAllBranches);

  const assetFilter = useTypedSelector(selectActiveFilter);

  const handleBranchChange = React.useCallback(
    (branchIds: string[]) => {
      dispatch(setAllFilterBranchIds(branchIds));
    },
    [dispatch]
  );

  return (
    <MultipleBranchButton
      branches={branches}
      disabled={disabled}
      minOneBranch
      onBranchChange={handleBranchChange}
      onHeader
      selectedBranchIds={assetFilter.information.branches}
    />
  );
};

export default AssetsBranchButton;
