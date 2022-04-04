import { CancelButton, GoBackButton, SelectButton } from 'catamaran/core/Button';
import { CatDialog, CatDialogAction, CatDialogButton } from 'catamaran/core';
import {
  removeAssetBranchId,
  removeMainCategoryId,
  setAssetBranchId,
  setAssetMainCategoryId
} from 'store/slices/asset/detail/slice';
import { selectAsset } from 'store/slices/asset/detail/selectors';
import { useTypedDispatch, useTypedSelector, withDialogWrapper } from 'hooks';
import BranchDialog from './BranchDialog';
import MainCategoryDialog from './MainCategoryDialog';
import React, { useCallback, useEffect, useMemo } from 'react';

type Props = {
  onClose?: () => void;
  onSuccess?: () => void;
  open: boolean;
  requiresBranch?: boolean;
  requiresMainCategory?: boolean;
};

type StepType = 'branch' | 'mainCategory';

function SingleAssetRequirementsDialog({
  onClose,
  onSuccess,
  open,
  requiresBranch = true,
  requiresMainCategory = true
}: Props) {
  const dispatch = useTypedDispatch();
  const assetForm = useTypedSelector(selectAsset);

  const handleBranchChange = useCallback(
    (event: any) => {
      dispatch(setAssetBranchId(event.target.value));
    },
    [dispatch]
  );

  const handleMainCategoryChange = useCallback(
    (event: any) => {
      dispatch(setAssetMainCategoryId(event.target.value));
    },
    [dispatch]
  );

  const keyStepDictionary = {
    branch: <BranchDialog branchId={assetForm.branchId} handleChange={handleBranchChange} />,
    mainCategory: (
      <MainCategoryDialog
        handleChange={handleMainCategoryChange}
        mainCategoryId={assetForm.mainCategoryId}
      />
    )
  };

  const availableSteps = useMemo(() => {
    const steps: StepType[] = [];
    if (requiresBranch) {
      steps.push('branch');
    }

    if (requiresMainCategory) {
      steps.push('mainCategory');
    }

    return steps;
  }, [requiresBranch, requiresMainCategory]);

  const [activeStepIndex, setActiveStepIndex] = React.useState(0);
  const currentStep = availableSteps[activeStepIndex];

  const handleNext = useCallback(async () => {
    if (activeStepIndex === availableSteps.length - 1) {
      onClose();
      onSuccess();
    } else {
      setActiveStepIndex(activeStepIndex + 1);
    }
  }, [activeStepIndex, onClose, onSuccess, availableSteps.length]);

  const handleBack = useCallback(async () => {
    if (activeStepIndex === 0) {
      dispatch(removeAssetBranchId());
      dispatch(removeMainCategoryId());
      onClose();
    } else {
      setActiveStepIndex(activeStepIndex - 1);
    }
  }, [activeStepIndex, onClose, dispatch]);

  const [selectEnabled, setSelectEnabled] = React.useState(false);

  useEffect(() => {
    switch (currentStep) {
      case 'branch':
        setSelectEnabled(!!assetForm.branchId);
        break;
      case 'mainCategory':
        setSelectEnabled(!!assetForm.mainCategoryId);
        break;
      default:
        setSelectEnabled(false);
        break;
    }
  }, [assetForm.branchId, assetForm.mainCategoryId, currentStep]);

  return (
    <CatDialog onAction={handleNext} onClose={handleBack} open={open}>
      {keyStepDictionary[currentStep]}
      <CatDialogAction>
        <CatDialogButton
          component={activeStepIndex === 0 ? CancelButton : GoBackButton}
          variant="close"
        />
        <CatDialogButton component={SelectButton} disabled={!selectEnabled} variant="action" />
      </CatDialogAction>
    </CatDialog>
  );
}

export default withDialogWrapper(SingleAssetRequirementsDialog);
