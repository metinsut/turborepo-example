import { BREAKDOWN_OPEN } from 'routes/constant-route';
import { CatIconButton } from 'catamaran/core';
import {
  clearFilters,
  defaultState,
  selectBranchFilters,
  selectMyRequestList,
  updateBranchFilters
} from 'store/slices/tasks/myRequests';
import {
  useDialogState,
  useFindObjectChangesCount,
  useTypedDispatch,
  useTypedSelector
} from 'hooks';
import { useHistory } from 'react-router-dom';
import AssetSearchModal from 'components/ContentLayout/Search/AssetSearchModal';
import BranchFilter from 'components/Branch/BranchFilter/BranchFilter';
import FilterCancelIcon from 'catamaran/icons/FilterCancel';
import PlusIcon from 'catamaran/icons/Plus';
import StatusFilter from './StatusFilter';

const Header = () => {
  const history = useHistory();
  const dispatch = useTypedDispatch();
  const selectedBranchIds = useTypedSelector(selectBranchFilters);
  const myRequestList = useTypedSelector(selectMyRequestList);
  const { isOpen, togglePopup } = useDialogState();

  const filterChangesCount = useFindObjectChangesCount(defaultState, myRequestList, [
    'localStorageInitialized',
    'page',
    'size',
    'total',
    'entities',
    'ids'
  ]);
  const isFilterEdited = filterChangesCount > 0;

  const handleClearFilter = () => {
    dispatch(clearFilters());
  };

  const handleBranchChange = (branchIds: string[]) => {
    dispatch(updateBranchFilters(branchIds));
  };

  const onAssetSelect = async (assetId: string) => {
    history.push(`${BREAKDOWN_OPEN}?assetId=${assetId}`);
    togglePopup();
  };

  const openSearchModal = () => {
    togglePopup();
  };

  return (
    <div className="grid grid-auto-flow-column gap-24 justify-content-end align-items-center py8 px12">
      <div className="flex gap-8 align-items-center">
        <StatusFilter />
        <BranchFilter onChange={handleBranchChange} selectedBranchIds={selectedBranchIds} />
      </div>
      <div className="flex align-items-center">
        <CatIconButton disabled={!isFilterEdited} onClick={handleClearFilter}>
          <FilterCancelIcon color="red" />
        </CatIconButton>
        <div className="divider-vertical" />
        <PlusIcon className="cursor-pointer" color="green" onClick={openSearchModal} />
      </div>
      <AssetSearchModal onAssetSelect={onAssetSelect} onClose={() => togglePopup()} open={isOpen} />
    </div>
  );
};

export default Header;
