import { Box, CatIconButton } from 'catamaran/core';
import { Divider, Theme, Typography, makeStyles } from 'catamaran/core/mui';
import { Trans, useTranslation } from 'react-i18next';
import {
  close,
  goBack,
  gotoNextStep,
  selectExistingPlanId
} from 'store/slices/contractplans/wizard/slice';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import CancelIcon from 'catamaran/icons/Cancel';
import ExistingPlanCard from 'views/Assets/AssetDetail/ContractProtectionDefinition/Plan/ExistingPlanCard';
import React from 'react';
import UnlinkIcon from 'catamaran/icons/Unlink';
import WizardBottomBar from '../../WizardBottomBar';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '560px'
  }
}));

type Props = {
  className?: string;
};

function ExistingWarning(props: Props) {
  const classes = useStyles();
  const { className } = props;

  const { t } = useTranslation();
  const dispatch = useTypedDispatch();

  const existingPlanId = useTypedSelector(selectExistingPlanId);

  const handleClose = () => {
    dispatch(close());
  };

  const handleNext = async () => {
    await dispatch(gotoNextStep());
  };

  const handleBack = async () => {
    dispatch(goBack());
  };

  return (
    <Box className={clsx(classes.root, className)} pb={1}>
      <Box alignItems="center" flex px={3} py={2}>
        <Box marginRight="8px" opacity={0.8}>
          <UnlinkIcon color="darkGrey" contained={false} hoverable={false} />
        </Box>
        <Typography variant="h2">
          <Trans
            components={{ bold: <b /> }}
            i18nKey="plans.wizard.existing_plan_dialog_title"
            t={t}
          />
        </Typography>
        <Box flexGrow={1} />
        <CatIconButton onClick={handleClose}>
          <CancelIcon color="red" contained fontSize="medium" />
        </CatIconButton>
      </Box>
      <Divider style={{ margin: '0px 32px' }} />
      <Box pt={3} px={4}>
        <UnlinkIcon color="red" hoverable={false} />
        <Box py={3}>
          <Typography variant="body1">{t('plans.wizard.existing_replacement_warning')}</Typography>
        </Box>
        <ExistingPlanCard planId={existingPlanId} />
      </Box>
      <WizardBottomBar
        backButtonType="goBack"
        nextButtonType="next"
        onBack={handleBack}
        onNext={handleNext}
      />
    </Box>
  );
}

export default ExistingWarning;
