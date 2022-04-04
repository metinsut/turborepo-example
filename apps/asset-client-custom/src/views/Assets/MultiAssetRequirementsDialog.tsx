import { DialogLegacy } from 'catamaran/core';
import { Theme, makeStyles } from 'catamaran/core/mui';
import { removeImportBranchId, setImportBranchId } from 'store/slices/imports/asset/slice';
import { selectAssetImportBranchId } from 'store/slices/imports/asset/selectors';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import BranchDialog from './BranchDialog';
import React, { useCallback, useMemo } from 'react';
import WizardBottomBar from 'components/WizardBottomBar';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  actions: {
    justifyContent: 'center'
  },
  divider: {
    margin: theme.spacing(0, 1.5)
  },
  root: {}
}));

type Props = {
  className?: string;
  onClose?: () => void;
  onSuccess?: () => void;
  open: boolean;
};

function MultiAssetRequirementsDialog(props: Props) {
  const classes = useStyles();
  const { className, onClose, onSuccess, open } = props;

  const dispatch = useTypedDispatch();
  const branchId = useTypedSelector(selectAssetImportBranchId);

  const handleBranchChange = (event: any) => {
    dispatch(setImportBranchId(event.target.value));
  };

  const steps: JSX.Element[] = [
    <BranchDialog branchId={branchId} handleChange={handleBranchChange} />
  ];
  const [activeStepIndex, setActiveStepIndex] = React.useState(0);

  const handleNext = useCallback(async () => {
    if (activeStepIndex === steps.length - 1) {
      onClose();
      onSuccess();
    } else {
      setActiveStepIndex(activeStepIndex + 1);
    }
  }, [activeStepIndex, onClose, onSuccess, steps.length]);

  const handleBack = useCallback(async () => {
    if (activeStepIndex === 0) {
      dispatch(removeImportBranchId());
      onClose();
    } else {
      setActiveStepIndex(activeStepIndex - 1);
    }
  }, [activeStepIndex, onClose, dispatch]);

  const selectEnabled = useMemo(() => {
    switch (activeStepIndex) {
      case 0:
        return !!branchId;
      default:
        return false;
    }
  }, [activeStepIndex, branchId]);

  return (
    <DialogLegacy className={clsx(className, classes.root)} maxWidth="xs" open={open}>
      {steps[activeStepIndex]}
      <WizardBottomBar
        activeStepIndex={activeStepIndex}
        nextEnabled={selectEnabled}
        onBack={handleBack}
        onNext={handleNext}
      />
    </DialogLegacy>
  );
}

export default MultiAssetRequirementsDialog;
