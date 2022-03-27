import { Box } from 'catamaran/core';
import { Day, daysOfWeek } from 'store/common';
import { useDaysOfWeek } from 'hooks/useDaysOfWeek';
import PeriodSelector from 'components/PeriodSelector';
import React from 'react';

type Props = {
  className?: string;
  onDaySelect: (day: Day) => void;
  selectedDays: Day[];
};

function DaySelector(props: Props) {
  const { className, onDaySelect, selectedDays } = props;

  const availableDays = useDaysOfWeek(true);
  const handleDaySelect = (dayOfWeek: number) => {
    const day = daysOfWeek[dayOfWeek];
    if (selectedDays.includes(day) && selectedDays.length === 1) {
      return;
    }

    onDaySelect(day);
  };

  return (
    <Box className={className} flex>
      {availableDays.map((day, index) => (
        <PeriodSelector
          key={day}
          onChange={() => handleDaySelect(index)}
          selected={selectedDays.includes(daysOfWeek[index])}
          size="small"
        >
          {day}
        </PeriodSelector>
      ))}
    </Box>
  );
}

export default DaySelector;
