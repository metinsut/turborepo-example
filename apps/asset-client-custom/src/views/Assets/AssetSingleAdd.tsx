import { ASSET_ADD } from 'routes/constant-route';
import { isObjectNullOrEmpty } from 'utils';
import { selectAllBranchIds } from 'store/slices/branches';
import { selectAllMainCategories } from 'store/slices/session';
import {
  selectInitialAssetFormBranchId,
  selectInitialAssetFormMainCategoryId
} from 'store/slices/asset/detail/selectors';
import {
  setInitialAssetBranchId,
  setInitialAssetMainCategoryId
} from 'store/slices/asset/detail/slice';
import { useDialogState, useTypedDispatch, useTypedSelector } from 'hooks';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import SingleAssetRequirementsDialog from './SingleAssetRequirementsDialog';
import useDeepCompareEffect from 'use-deep-compare-effect';

type Props = {
  onDeactivate: () => void;
};

function AssetSingleAdd({ onDeactivate }: Props) {
  const dispatch = useTypedDispatch();
  const history = useHistory();

  const branchIds = useTypedSelector(selectAllBranchIds);
  const mainCategories = useTypedSelector(selectAllMainCategories);

  const branchId = useTypedSelector(selectInitialAssetFormBranchId);
  const mainCategoryId = useTypedSelector(selectInitialAssetFormMainCategoryId);

  useDeepCompareEffect(() => {
    if (branchIds.length === 1) {
      dispatch(setInitialAssetBranchId(branchIds[0].toString()));
    }
  }, [branchIds, dispatch]);

  useDeepCompareEffect(() => {
    if (mainCategories.length === 1) {
      dispatch(setInitialAssetMainCategoryId(mainCategories[0].id));
    }
  }, [mainCategories, dispatch]);

  const { isOpen: isRequirementOpen, togglePopup: toggleRequirementPopup } = useDialogState();

  useEffect(() => {
    if (branchId && mainCategoryId) {
      history.push(ASSET_ADD);
      onDeactivate();
    } else {
      toggleRequirementPopup(true);
    }
  }, [branchId, history, mainCategoryId, onDeactivate, toggleRequirementPopup]);

  const handleDialogClose = () => {
    toggleRequirementPopup(false);
    onDeactivate();
  };

  const handleDialogSuccess = () => {
    history.push(ASSET_ADD);
    onDeactivate();
  };

  return (
    <SingleAssetRequirementsDialog
      onClose={handleDialogClose}
      onSuccess={handleDialogSuccess}
      open={isRequirementOpen}
      requiresBranch={isObjectNullOrEmpty(branchId)}
      requiresMainCategory={isObjectNullOrEmpty(mainCategoryId)}
    />
  );
}

export default AssetSingleAdd;
