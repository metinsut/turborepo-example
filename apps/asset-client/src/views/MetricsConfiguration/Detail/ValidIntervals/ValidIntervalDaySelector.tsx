import { Day } from 'store/common';
import { daysUpdated } from 'store/slices/metricsConfiguration/detail/slice';
import { selectDraftDays } from 'store/slices/metricsConfiguration/detail/selectors';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import DaySelector from 'components/DaySelector/DaySelector';

function ValidIntervalDaySelector() {
  const dispatch = useTypedDispatch();
  const selectedDays = useTypedSelector(selectDraftDays);

  const handleDaySelect = (day: Day) => {
    dispatch(daysUpdated(day));
  };

  return <DaySelector onDaySelect={handleDaySelect} selectedDays={selectedDays} />;
}

export default ValidIntervalDaySelector;
