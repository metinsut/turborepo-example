import { selectAllBranches } from 'store/slices/branches';
import { selectBranchIds } from 'store/slices/users/filter/selectors';
import { updateBranchIds } from 'store/slices/users/filter/slice';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import MultipleBranchButton from 'layouts/Dashboard/components/MultipleBranchButton';

const Branch = () => {
  const dispatch = useTypedDispatch();
  const branches = useTypedSelector(selectAllBranches);
  const selectedBranchIds = useTypedSelector(selectBranchIds);

  const handleBranchChange = (branchIds: string[]) => {
    dispatch(updateBranchIds(branchIds));
  };

  const clearAllBranches = () => {
    dispatch(updateBranchIds([]));
  };

  const anyBranchSelected = selectedBranchIds.length !== 0;

  return (
    branches.length > 0 && (
      <MultipleBranchButton
        branches={branches}
        className="w-full"
        clearActive={anyBranchSelected}
        onBranchChange={handleBranchChange}
        onClear={clearAllBranches}
        selectedBranchIds={selectedBranchIds}
      />
    )
  );
};

export default Branch;
