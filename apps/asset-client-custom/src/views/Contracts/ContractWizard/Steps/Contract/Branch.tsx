import { Box } from 'catamaran/core';
import { Divider, Theme, Typography, makeStyles } from 'catamaran/core/mui';
import {
  goBack,
  gotoNextStep,
  selectSelectedBranchIds
} from 'store/slices/contractplans/wizard/slice';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import BranchIcon from 'catamaran/icons/Branch';
import BranchSelector from '../BranchSelector';
import React from 'react';
import WizardBottomBar from '../../WizardBottomBar';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '311px',
    width: '432px'
  }
}));

type Props = {
  className?: string;
};

function Branch(props: Props) {
  const classes = useStyles();
  const { className } = props;

  const dispatch = useTypedDispatch();
  const { t } = useTranslation();

  const selectedBranchIds = useTypedSelector(selectSelectedBranchIds);

  const handleNext = async () => {
    await dispatch(gotoNextStep());
  };

  const handleBack = async () => {
    dispatch(goBack());
  };

  const valid = selectedBranchIds.length > 0;
  const contractResource = t('contracts.contract').toLowerCase();

  return (
    <Box className={clsx(classes.root, className)} flex flexDirection="column" pb={1}>
      <Box flex px={3} py={2}>
        <Box marginRight="8px" opacity={0.8}>
          <BranchIcon color="darkGrey" contained={false} hoverable={false} />
        </Box>
        <Typography variant="h2">{t('branches.wizard_select_branch')}</Typography>
      </Box>
      <Divider style={{ margin: '0px 32px' }} />
      <Box flex flexDirection="column" pt="13px" px={4}>
        <Typography variant="body1">
          {t('branches.wizard_more_than_one_branch', { item: contractResource })}
        </Typography>
        <Box height={24} />
        <Typography variant="body1">
          {t('branches.wizard_message', { item: contractResource })}
        </Typography>
        <Box height={24} />
        <BranchSelector />
      </Box>
      <Box flex flexGrow={1} />
      <WizardBottomBar
        backButtonType="cancel"
        nextButtonType="select"
        nextDisabled={!valid}
        onBack={handleBack}
        onNext={handleNext}
      />
    </Box>
  );
}

export default Branch;
