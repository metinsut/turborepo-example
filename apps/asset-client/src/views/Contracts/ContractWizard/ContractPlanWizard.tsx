import { DialogLegacy } from 'catamaran/core';
import { Theme, makeStyles } from 'catamaran/core/mui';
import { clearWizard, selectActiveStep } from 'store/slices/contractplans/wizard/slice';
import { useTypedDispatch, useTypedSelector, withDialogWrapper } from 'hooks';
import { useWizardStep } from './Steps/useWizardStep';
import React, { useEffect } from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {}
}));

type Props = {
  className?: string;
  open: boolean;
  onClose?: () => void;
};

function ContractPlanWizard(props: Props) {
  const classes = useStyles();
  const { className, open = false, onClose } = props;
  const dispatch = useTypedDispatch();

  const StepComponent = useWizardStep();
  const activeStep = useTypedSelector(selectActiveStep);

  useEffect(() => {
    if (!activeStep) {
      onClose();
    }
  }, [activeStep, onClose]);

  useEffect(
    () => () => {
      dispatch(clearWizard());
    },
    [dispatch]
  );

  if (!activeStep) {
    return null;
  }

  return (
    <DialogLegacy
      className={clsx(className, classes.root)}
      maxWidth={false}
      open={open}
      PaperProps={{
        style: { borderRadius: '16px' }
      }}
    >
      <StepComponent />
    </DialogLegacy>
  );
}

export default withDialogWrapper(ContractPlanWizard);
