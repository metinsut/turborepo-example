import { CatIconButton } from 'catamaran/core';
import {
  clearFilters,
  defaultWfcFilter,
  selectWfcFilter,
  selectWfcFilterBranchIds,
  updateBranch
} from 'store/slices/tasks/waitingForConformation/waitingForConfirmationFilter';
import { selectAllBranchIds } from 'store/slices/branches';
import { useFindObjectChangesCount, useTypedDispatch, useTypedSelector } from 'hooks';
import BranchFilter from 'components/Branch/BranchFilter/BranchFilter';
import FilterCancelIcon from 'catamaran/icons/FilterCancel';

const Header = () => {
  const dispatch = useTypedDispatch();
  const selectedBranchIds = useTypedSelector(selectWfcFilterBranchIds);
  const branchIds = useTypedSelector(selectAllBranchIds);
  const wfcFilter = useTypedSelector(selectWfcFilter);

  const filterChangesCount = useFindObjectChangesCount(defaultWfcFilter, wfcFilter, [
    'localStorageInitialized'
  ]);
  const isFilterEdited = filterChangesCount > 0;

  const handleChange = (branchIds: string[]) => {
    dispatch(updateBranch(branchIds));
  };

  const handleClearFilter = () => {
    dispatch(clearFilters());
  };

  if (branchIds.length === 1) {
    return null;
  }

  return (
    <div className="grid grid-auto-flow-column gap-24 justify-content-end align-items-center py8 px12">
      <BranchFilter onChange={handleChange} selectedBranchIds={selectedBranchIds} />
      <CatIconButton disabled={!isFilterEdited} onClick={handleClearFilter}>
        <FilterCancelIcon color="red" />
      </CatIconButton>
    </div>
  );
};

export default Header;
