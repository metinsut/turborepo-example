import { Box } from 'catamaran/core';
import { Divider, Theme, Typography, makeStyles } from 'catamaran/core/mui';
import {
  goBack,
  gotoNextStep,
  selectSelectedMainCategoryId
} from 'store/slices/contractplans/wizard/slice';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import CategoryIcon from 'catamaran/icons/Category';
import MainCategorySelector from '../MainCategorySelector';
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

function MainCategory(props: Props) {
  const classes = useStyles();
  const { className } = props;

  const dispatch = useTypedDispatch();
  const { t } = useTranslation();

  const selectedMainCategoryId = useTypedSelector(selectSelectedMainCategoryId);

  const handleNext = async () => {
    await dispatch(gotoNextStep());
  };

  const handleBack = async () => {
    dispatch(goBack());
  };

  const valid = !!selectedMainCategoryId;
  const planResource = t('plans.plan').toLowerCase();

  return (
    <Box className={clsx(classes.root, className)} flex flexDirection="column" pb={1}>
      <Box flex px={3} py={2}>
        <Box marginRight="8px" opacity={0.8}>
          <CategoryIcon color="darkGrey" contained={false} hoverable={false} />
        </Box>
        <Typography variant="h2">{t('categories.main.wizard_select_main_category')}</Typography>
      </Box>
      <Divider style={{ margin: '0px 32px' }} />
      <Box flex flexDirection="column" pt="13px" px={4}>
        <Typography variant="body1">
          {t('categories.main.wizard_more_than_one_category', { item: planResource })}
        </Typography>
        <Box height={24} />
        <Typography variant="body1">
          {t('categories.main.wizard_message', { item: planResource })}
        </Typography>
        <Box height={24} />
        <MainCategorySelector />
      </Box>
      <Box flex flexGrow={1} />
      <WizardBottomBar
        backButtonType="goBack"
        nextButtonType="select"
        nextDisabled={!valid}
        onBack={handleBack}
        onNext={handleNext}
      />
    </Box>
  );
}

export default MainCategory;
