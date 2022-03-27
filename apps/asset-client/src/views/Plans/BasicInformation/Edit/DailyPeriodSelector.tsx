import { CatMenuItem, CatSelect } from 'catamaran/core';
import { PlanBasicInformation } from 'store/slices/plans/types';
import { dailyPeriods } from 'store/slices/plans/data';
import { updateFrequency } from 'store/slices/plans/slice';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch } from 'hooks';

type Props = {
  className?: string;
  planBasicInformation: PlanBasicInformation;
};

function DailyPeriodSelector(props: Props) {
  const { className, planBasicInformation } = props;

  const dispatch = useTypedDispatch();
  const { t } = useTranslation();

  const handleChange = (event: any) => {
    const frequency = event.target.value;
    dispatch(updateFrequency(frequency));
  };

  const getRenderValue = (value: number) => {
    switch (value) {
      case 0:
        return t('common.dropdown_generic_hint');
      case 1:
        return t('plans.edit.daily_frequency_single');
      default:
        return t('plans.edit.daily_frequency_multiple', { count: value });
    }
  };

  return (
    <CatSelect
      className={className}
      displayEmpty
      fullWidth
      onChange={handleChange}
      renderValue={(selected) => getRenderValue(selected as number)}
      value={planBasicInformation.frequency ?? 0}
    >
      <CatMenuItem disabled key={0} value={0}>
        {t('common.dropdown_generic_hint')}
      </CatMenuItem>
      {dailyPeriods.map((period) => (
        <CatMenuItem key={period} value={period}>
          {period === 1
            ? t('plans.edit.daily_frequency_single')
            : t('plans.edit.daily_frequency_multiple', { count: period })}
        </CatMenuItem>
      ))}
    </CatSelect>
  );
}

export default DailyPeriodSelector;
