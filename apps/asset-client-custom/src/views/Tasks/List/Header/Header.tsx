import { CatIconButton } from 'catamaran/core';
import {
  clearFilters,
  defaultTaskListFilter,
  selectBranch,
  selectTaskListFilters,
  updateBranchFilters
} from 'store/slices/tasks/taskList/taskListFilter';
import { useFindObjectChangesCount, useTypedDispatch, useTypedSelector } from 'hooks';
import BranchFilter from 'components/Branch/BranchFilter/BranchFilter';
import FilterCancelIcon from 'catamaran/icons/FilterCancel';
import PersonFilter from './PersonFilter';
import PriorityFilter from './PriorityFilter';
import StatusFilter from './StatusFilter';

const Header = () => {
  const dispatch = useTypedDispatch();
  const selectedBranchIds = useTypedSelector(selectBranch);
  const taskListFilters = useTypedSelector(selectTaskListFilters);

  const filterChangesCount = useFindObjectChangesCount(defaultTaskListFilter, taskListFilters, [
    'localStorageInitialized',
    'taskTypes'
  ]);
  const isFilterEdited = filterChangesCount > 0;

  const handleClearFilter = () => {
    dispatch(clearFilters());
  };

  const handleBranchChange = (branchIds: string[]) => {
    dispatch(updateBranchFilters(branchIds));
  };

  return (
    <div className="grid grid-auto-flow-column gap-24 justify-content-end align-items-center py8 px12">
      <div className="flex gap-8 align-items-center">
        <StatusFilter />
        <PriorityFilter />
        <PersonFilter />
        <BranchFilter onChange={handleBranchChange} selectedBranchIds={selectedBranchIds} />
      </div>
      <CatIconButton disabled={!isFilterEdited} onClick={handleClearFilter}>
        <FilterCancelIcon color="red" />
      </CatIconButton>
    </div>
  );
};
export default Header;
