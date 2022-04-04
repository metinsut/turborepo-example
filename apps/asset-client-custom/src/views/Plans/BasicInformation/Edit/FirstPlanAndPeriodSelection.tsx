import { Box } from 'catamaran/core';
import { Contract } from 'store/slices/contracts/types';
import { FormHelper } from 'hooks/useFormState';
import { PlanBasicInformation } from 'store/slices/plans/types';
import { Theme, Typography, makeStyles } from 'catamaran/core/mui';
import { useTranslation } from 'react-i18next';
import DailyPeriodSelector from './DailyPeriodSelector';
import PlanDates from './PlanDates';
import PlanPeriods from './PlanPeriods';
import React from 'react';
import SamplePlans from './SamplePlans';
import UpdateIcon from 'catamaran/icons/Update';
import WeeklyPeriodSelector from './WeeklyPeriodSelector';

const useStyles = makeStyles((theme: Theme) => ({
  root: {}
}));

type Props = {
  associatedContract: Contract;
  formHelper: FormHelper<PlanBasicInformation>;
  planBasicInformation: PlanBasicInformation;
};

function FirstPlanAndPeriodSelection(props: Props) {
  const classes = useStyles();
  const { associatedContract, formHelper, planBasicInformation } = props;

  const { t } = useTranslation();
  const planTypeResource = t(`plans.types.${planBasicInformation.type}`);

  return (
    <>
      <Box alignItems="center" flex mb={2}>
        <UpdateIcon color="darkGrey" contained fontSize="small" hoverable={false} />
        <Box ml={1}>
          <Typography variant="body2">
            {t('plans.edit.first_plan_desc', { type: planTypeResource.toLowerCase() })}
          </Typography>
        </Box>
      </Box>
      <Box flex mb={2}>
        <Box width="50%">
          <PlanPeriods className="mb8" planBasicInformation={planBasicInformation} />
          {planBasicInformation.period === 'daily' && (
            <DailyPeriodSelector planBasicInformation={planBasicInformation} />
          )}
          {planBasicInformation.period === 'weekly' && (
            <WeeklyPeriodSelector planBasicInformation={planBasicInformation} />
          )}
        </Box>
        <Box ml={1.5} width="50%">
          <PlanDates
            associatedContract={associatedContract}
            formHelper={formHelper}
            planBasicInformation={planBasicInformation}
          />
        </Box>
      </Box>
      <Box flex mb={2}>
        <SamplePlans planBasicInformation={planBasicInformation} />
      </Box>
    </>
  );
}

export default FirstPlanAndPeriodSelection;
