import { Day } from 'store/common';
import { MetricType } from 'store/slices/contracts/types';
import { Theme, makeStyles } from 'catamaran/core/mui';
import { updateMetricValidDay } from 'store/slices/contracts/slice';
import { useTypedDispatch } from 'hooks';
import DaySelector from 'components/DaySelector/DaySelector';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {}
}));

type Props = {
  className?: string;
  metricType: MetricType;
  selectedDays: Day[];
};

function ValidIntervalDaySelector(props: Props) {
  const classes = useStyles();
  const { className, metricType, selectedDays } = props;

  const dispatch = useTypedDispatch();
  const handleDaySelect = (day: Day) => {
    dispatch(updateMetricValidDay({ day, metricType }));
  };

  return (
    <DaySelector
      className={clsx(classes.root, className)}
      onDaySelect={handleDaySelect}
      selectedDays={selectedDays}
    />
  );
}

export default ValidIntervalDaySelector;
