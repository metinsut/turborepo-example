import { Theme, makeStyles } from 'catamaran/core/mui';
import { goBack, gotoNextStep } from 'store/slices/contractplans/wizard/slice';
import { useTypedDispatch } from 'hooks';
import ContractsPageModal from 'views/Contracts/ContractsPageModal';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {}
}));

type Props = {
  className?: string;
};

function AddNew(props: Props) {
  const classes = useStyles();
  const dispatch = useTypedDispatch();
  const { className } = props;

  const handleNext = async () => {
    await dispatch(gotoNextStep());
  };

  const handleBack = async () => {
    dispatch(goBack());
  };

  const handleConfirm = async () => {
    await handleNext();
  };

  return (
    <ContractsPageModal
      className={clsx(className, classes.root)}
      onClose={handleBack}
      onConfirm={handleConfirm}
      open
    />
  );
}

export default AddNew;
