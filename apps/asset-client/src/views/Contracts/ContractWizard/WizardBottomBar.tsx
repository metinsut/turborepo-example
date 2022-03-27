import { CatButton } from 'catamaran/core';
import { DialogActions, Divider, Theme, makeStyles } from 'catamaran/core/mui';
import { useTranslation } from 'react-i18next';
import ArrowLeftIcon from 'catamaran/icons/ArrowLeft';
import CheckIcon from 'catamaran/icons/Check';
import ChevronRIcon from 'catamaran/icons/ChevronR';
import CloseIcon from 'catamaran/icons/Close';
import React from 'react';

import clsx from 'clsx';
import useLoadingWithoutDispatch from 'hooks/useLoadingWithoutDispatch';

const useStyles = makeStyles((theme: Theme) => ({
  divider: {
    margin: theme.spacing(0, 1.5)
  },
  root: {
    justifyContent: 'center'
  }
}));

type Props = {
  className?: string;
  backButtonType?: 'goBack' | 'cancel';
  finalStep?: boolean;
  nextButtonType?: 'select' | 'next';
  nextDisabled?: boolean;
  onBack?: () => void;
  onNext: () => Promise<void>;
};

function WizardBottomBar(props: Props) {
  const classes = useStyles();
  const {
    backButtonType,
    className,
    finalStep = false,
    nextButtonType,
    nextDisabled = false,
    onBack,
    onNext
  } = props;

  const { t } = useTranslation();

  const [loading, promiseWrapper] = useLoadingWithoutDispatch<void>();
  const handleNext = async () => {
    await promiseWrapper(onNext());
  };

  let nextButton = null;
  if (finalStep) {
    nextButton = (
      <CatButton
        color="green"
        endIcon={<CheckIcon />}
        loading={loading}
        onClick={handleNext}
        size="large"
      >
        {t('common.confirm')}
      </CatButton>
    );
  } else if (nextButtonType === 'next') {
    nextButton = (
      <CatButton
        color="blue"
        disabled={nextDisabled}
        endIcon={<ChevronRIcon />}
        loading={loading}
        onClick={handleNext}
        size="large"
      >
        {t('common.next')}
      </CatButton>
    );
  } else {
    nextButton = (
      <CatButton
        color="green"
        disabled={nextDisabled}
        endIcon={<CheckIcon />}
        loading={loading}
        onClick={handleNext}
        size="large"
      >
        {t('common.select')}
      </CatButton>
    );
  }

  const backButton =
    backButtonType === 'goBack' ? (
      <CatButton color="darkGrey" onClick={onBack} size="large" startIcon={<ArrowLeftIcon />}>
        {t('common.back')}
      </CatButton>
    ) : (
      <CatButton color="red" onClick={onBack} size="large" startIcon={<CloseIcon />}>
        {t('common.cancel')}
      </CatButton>
    );

  return (
    <DialogActions className={clsx(className, classes.root)} disableSpacing>
      {!finalStep && (
        <>
          {backButton}
          <Divider className={classes.divider} flexItem orientation="vertical" />
        </>
      )}
      {nextButton}
    </DialogActions>
  );
}

export default WizardBottomBar;
