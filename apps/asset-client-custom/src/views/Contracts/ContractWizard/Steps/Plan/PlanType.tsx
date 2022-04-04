import { Box } from 'catamaran/core';
import { Divider, Grid, Theme, Typography, makeStyles } from 'catamaran/core/mui';
import { PlanType } from 'store/slices/plans/types';
import { Trans, useTranslation } from 'react-i18next';
import {
  goBack,
  gotoNextStep,
  selectSelectedPlanType,
  setSelectedPlanType
} from 'store/slices/contractplans/wizard/slice';
import { planTypes } from 'store/slices/plans/data';
import { selectAsset } from 'store/slices/asset/detail/selectors';
import { useTypedDispatch } from 'hooks';
import { useTypedSelector } from 'hooks/useTypedSelector';
import PlanIcon from 'catamaran/icons/Plan';
import PlanTypeIcon from 'views/Plans/PlanTypeIcon';
import React from 'react';
import TypeItem from 'components/TypeItem';
import WizardBottomBar from '../../WizardBottomBar';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '344px',
    width: '560px'
  }
}));

type Props = {
  className?: string;
};

function PlanTypeStep(props: Props) {
  const classes = useStyles();
  const { className } = props;

  const dispatch = useTypedDispatch();
  const { t } = useTranslation();

  const asset = useTypedSelector(selectAsset);
  const selectedPlanType = useTypedSelector(selectSelectedPlanType);

  const handleItemClick = (planType: PlanType) => () => {
    if (planType !== selectedPlanType) {
      dispatch(setSelectedPlanType(planType));
    }
  };

  const handleNext = async () => {
    await dispatch(gotoNextStep());
  };

  const handleBack = async () => {
    dispatch(goBack());
  };

  const valid = !!selectedPlanType;

  return (
    <Box className={clsx(classes.root, className)} flex flexDirection="column" pb={1}>
      <Box alignItems="center" flex px={3} py={2}>
        <Box marginRight="8px" opacity={0.8}>
          <PlanIcon color="darkGrey" contained={false} hoverable={false} />
        </Box>
        <Typography variant="h2">{t('plans.wizard.plan_type_header')}</Typography>
      </Box>
      <Divider style={{ margin: '0px 32px' }} />
      <Box alignContent="center" flex flexGrow={1}>
        <Grid alignContent="center" container justifyContent="center">
          {planTypes.map((planType) => {
            const planTypeResource = t(`plans.types.${planType}`);
            return (
              <TypeItem
                description={
                  <Trans
                    components={{
                      hide: <span hidden={!asset.id} />
                    }}
                    i18nKey="plans.wizard.plan_type_item_description"
                    t={t}
                    values={{ type: planTypeResource.toLowerCase() }}
                  />
                }
                key={planType}
                onClick={handleItemClick(planType)}
                selected={selectedPlanType === planType ?? false}
                typeIcon={<PlanTypeIcon contained={false} hoverable={false} planType={planType} />}
                typeName={planTypeResource}
              />
            );
          })}
        </Grid>
      </Box>
      <WizardBottomBar
        backButtonType="cancel"
        nextButtonType="next"
        nextDisabled={!valid}
        onBack={handleBack}
        onNext={handleNext}
      />
    </Box>
  );
}

export default PlanTypeStep;
