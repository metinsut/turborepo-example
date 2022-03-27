import { Box } from 'catamaran/core';
import { PlanBasicInformation, PlanPeriodType } from 'store/slices/plans/types';
import { Theme, ToggleButtonGroup, Typography, makeStyles } from 'catamaran/core/mui';
import { Trans, useTranslation } from 'react-i18next';
import { planPeriodTypes } from 'store/slices/plans/data';
import { updatePlanPeriodType } from 'store/slices/plans/slice';
import { useTypedDispatch } from 'hooks';
import PeriodSelector from 'components/PeriodSelector';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {}
}));

type Props = {
  className?: string;
  planBasicInformation: PlanBasicInformation;
};

function PlanPeriods(props: Props) {
  const classes = useStyles();
  const { className, planBasicInformation } = props;

  const { t } = useTranslation();
  const dispatch = useTypedDispatch();

  const handleChange = (event: React.MouseEvent<HTMLElement>, newType: string | null) => {
    const planType = newType as PlanPeriodType;

    dispatch(updatePlanPeriodType(planType));
  };

  return (
    <Box className={clsx(classes.root, className)}>
      <ToggleButtonGroup exclusive onChange={handleChange} value={planBasicInformation.period}>
        {planPeriodTypes.map((type) => (
          <PeriodSelector key={type} value={type}>
            <Typography variant="body2">
              <Trans i18nKey={`plans.edit.period_types_bold.${type}`} t={t} />
            </Typography>
          </PeriodSelector>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
}

export default PlanPeriods;
