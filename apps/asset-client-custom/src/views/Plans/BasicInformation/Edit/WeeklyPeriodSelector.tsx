import { Box, CatMenuItem, CatSelect } from 'catamaran/core';
import { Day } from 'store/common';
import { PlanBasicInformation } from 'store/slices/plans/types';
import { updateFrequency, updatePeriodDay } from 'store/slices/plans/slice';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch } from 'hooks';
import { weeklyPeriods } from 'store/slices/plans/data';
import DaySelector from 'components/DaySelector/DaySelector';

type Props = {
  className?: string;
  planBasicInformation: PlanBasicInformation;
};

function WeeklyPeriodSelector(props: Props) {
  const { className, planBasicInformation } = props;

  const dispatch = useTypedDispatch();
  const { t } = useTranslation();

  const handleDaySelect = (day: Day) => {
    dispatch(updatePeriodDay(day));
  };

  const handleChange = (event: any) => {
    const frequency = event.target.value;
    dispatch(updateFrequency(frequency));
  };

  return (
    <Box alignItems="center" className={className} flex>
      <Box width="60%">
        <DaySelector onDaySelect={handleDaySelect} selectedDays={planBasicInformation.days} />
      </Box>
      <Box ml={1} width="40%">
        <CatSelect
          displayEmpty
          fullWidth
          onChange={handleChange}
          renderValue={(selected) => {
            const period = selected as number;
            switch (period) {
              case 0:
                return t('common.dropdown_generic_hint');
              case 1:
                return t('plans.edit.weekly_frequency_single');
              default:
                return t('plans.edit.weekly_frequency_multiple', { count: period });
            }
          }}
          value={planBasicInformation.frequency ?? 0}
        >
          <CatMenuItem disabled key={0} value={0}>
            {t('common.dropdown_generic_hint')}
          </CatMenuItem>
          {weeklyPeriods.map((period) => (
            <CatMenuItem key={period} value={period}>
              {period === 1
                ? t('plans.edit.weekly_frequency_single')
                : t('plans.edit.weekly_frequency_multiple', { count: period })}
            </CatMenuItem>
          ))}
        </CatSelect>
      </Box>
    </Box>
  );
}

export default WeeklyPeriodSelector;
