import { CatButton } from 'catamaran/core';
import { DialogActions, Divider, Theme, makeStyles } from 'catamaran/core/mui';
import { useTranslation } from 'react-i18next';
import ArrowLeftIcon from 'catamaran/icons/ArrowLeft';
import CheckIcon from 'catamaran/icons/Check';
import CloseIcon from 'catamaran/icons/Close';
import React from 'react';
import clsx from 'clsx';

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
  activeStepIndex: number;
  forceCancelButton?: boolean;
  lastStepIndex?: number;
  onBack: () => void;
  onNext: () => void;
  nextEnabled: boolean;
};

function WizardBottomBar(props: Props) {
  const classes = useStyles();
  const {
    activeStepIndex,
    forceCancelButton = false,
    lastStepIndex,
    className,
    nextEnabled,
    onBack,
    onNext
  } = props;

  const firstStep = activeStepIndex === 0;
  const lastStep = activeStepIndex === lastStepIndex;
  const { t } = useTranslation();

  return (
    <DialogActions className={clsx(className, classes.root)} disableSpacing>
      {!lastStep ? (
        <>
          {firstStep || forceCancelButton ? (
            <CatButton color="red" onClick={onBack} size="large" startIcon={<CloseIcon />}>
              {t('common.cancel')}
            </CatButton>
          ) : (
            <CatButton color="darkGrey" onClick={onBack} size="large" startIcon={<ArrowLeftIcon />}>
              {t('common.back')}
            </CatButton>
          )}
          <Divider className={classes.divider} flexItem orientation="vertical" />
          <CatButton
            color="green"
            disabled={!nextEnabled}
            endIcon={<CheckIcon />}
            onClick={onNext}
            size="large"
          >
            {t('common.select')}
          </CatButton>
        </>
      ) : (
        <CatButton color="green" endIcon={<CheckIcon />} onClick={onNext} size="large">
          {t('common.done')}
        </CatButton>
      )}
    </DialogActions>
  );
}

export default WizardBottomBar;
