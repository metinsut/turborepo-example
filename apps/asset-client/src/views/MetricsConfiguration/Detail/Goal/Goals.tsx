import { CatAreaButton, CatRadio, CatTypography } from 'catamaran/core';
import { Collapse, FormControlLabel, RadioGroup } from 'catamaran/core/mui';
import { GoalLimitType } from 'store/slices/metricsConfiguration/detail/type';
import { Trans, useTranslation } from 'react-i18next';
import { addMetricGoal } from 'store/slices/metricsConfiguration/detail/action';
import { goalTypeChanged } from 'store/slices/metricsConfiguration/detail/slice';
import { limitTypes } from 'store/slices/metricsConfiguration/detail/data';
import { selectDraftGoalForm } from 'store/slices/metricsConfiguration/detail/selectors';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import GoalItems from './GoalItems';
import TimeIcon from 'catamaran/icons/Time';

function Goals() {
  const dispatch = useTypedDispatch();
  const { t } = useTranslation();

  const goalForm = useTypedSelector(selectDraftGoalForm);

  const goals = goalForm[goalForm.type];

  const handleAddNewGoal = () => {
    dispatch(addMetricGoal(goalForm.type));
  };

  const handleChangeGoalType = (event: any) => {
    const goalType = event.target.value as GoalLimitType;
    dispatch(goalTypeChanged(goalType));
  };

  return (
    <div className="grid p24 gap-16">
      <div className="flex gap-8">
        <TimeIcon fontSize="small" />
        <div className="grid gap-5">
          <CatTypography className="opacity-8" variant="subtitle1">
            {t('metrics_configuration.detail.goals.title')}
          </CatTypography>
          <CatTypography className="opacity-6" variant="body2">
            {t('metrics_configuration.detail.goals.desc')}
          </CatTypography>
        </div>
      </div>
      <RadioGroup
        className="flex align-items-center gap-48"
        onChange={handleChangeGoalType}
        row
        value={goalForm.type}
      >
        {limitTypes.map((type) => (
          <FormControlLabel
            className="m0"
            control={<CatRadio color="primary" size="small" />}
            key={type}
            label={
              <CatTypography variant="body2">
                <Trans
                  i18nKey={`metrics_configuration.detail.goals.type_descriptions.${type}`}
                  t={t}
                />
              </CatTypography>
            }
            value={type}
          />
        ))}
      </RadioGroup>
      <Collapse in={goalForm.type !== 'none'}>
        <div className="grid gap-16">
          <GoalItems goals={goals} limitType={goalForm.type} />
          <CatAreaButton onClick={handleAddNewGoal} style={{ width: '360px' }}>
            {t('metrics_configuration.detail.goals.add_button_desc')}
          </CatAreaButton>
        </div>
      </Collapse>
    </div>
  );
}

export default Goals;
