import { CatAreaButton, CatRadio, CatTypography } from 'catamaran/core';
import { FormControlLabel, RadioGroup } from 'catamaran/core/mui';
import { GoalForm, GoalLimitType, MetricType } from 'store/slices/contracts/types';
import { SectionWrapperProps, withSectionWrapper } from 'views/Contracts/withSectionWrapper';
import { addMetricGoal } from 'store/slices/contracts/actions';
import { limitTypes } from 'store/slices/contracts/data';
import { updateMetricGoalType } from 'store/slices/contracts/slice';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch } from 'hooks';
import GoalItems from './GoalItems';
import TimeIcon from 'catamaran/icons/Time';

type Props = SectionWrapperProps & {
  metricType: MetricType;
  goalForm: GoalForm;
};

function MetricGoals(props: Props) {
  const { metricType, goalForm, sectionProps } = props;
  const dispatch = useTypedDispatch();
  const { t } = useTranslation();

  const goals = goalForm[goalForm.type];

  const handleAddNewGoal = () => {
    dispatch(addMetricGoal(metricType, goalForm.type));
  };

  const handleChangeGoalType = (event: any) => {
    const goalType = event.target.value as GoalLimitType;
    dispatch(updateMetricGoalType({ goalType, metricType }));
  };

  const metricTypeResource = metricType.isDefault
    ? t(`contracts.edit.metrics.types.${metricType.name}`)
    : metricType.name;

  const filteredLimitTypes = useMemo(
    () => limitTypes.filter((i) => sectionProps.availableParameters?.includes(i)),
    [sectionProps.availableParameters]
  );

  useEffect(() => {
    if (filteredLimitTypes.length === 1) {
      dispatch(updateMetricGoalType({ goalType: filteredLimitTypes[0], metricType }));
    }
  }, [dispatch, filteredLimitTypes, metricType]);

  return (
    <div className="grid p24 gap-16">
      <div className="flex gap-8">
        <TimeIcon fontSize="small" />
        <div>
          <CatTypography className="opacity-8" variant="subtitle1">
            {t('contracts.edit.metrics.goals.goals_header', { type: metricTypeResource })}
          </CatTypography>
          <CatTypography className="opacity-6" variant="body2">
            {t('contracts.edit.metrics.goals.goals_description', { type: metricTypeResource })}
          </CatTypography>
        </div>
      </div>
      {filteredLimitTypes.length > 1 && (
        <RadioGroup
          className="flex align-items-center gap-48"
          onChange={handleChangeGoalType}
          row
          value={goalForm.type}
        >
          {filteredLimitTypes.map((type) => (
            <FormControlLabel
              className="m0"
              control={<CatRadio color="primary" size="small" />}
              key={type}
              label={
                <CatTypography variant="caption">
                  {t(`contracts.edit.metrics.goals.type_descriptions.${type}`)}
                </CatTypography>
              }
              value={type}
            />
          ))}
        </RadioGroup>
      )}
      <GoalItems goals={goals} limitType={goalForm.type} metricType={metricType} />
      <CatAreaButton onClick={handleAddNewGoal} style={{ width: '360px' }}>
        {t('contracts.edit.metrics.goals.add_category_goal')}
      </CatAreaButton>
    </div>
  );
}

export default withSectionWrapper(MetricGoals);
