import { CatRadio, CatTypography } from 'catamaran/core';
import { FormControlLabel, RadioGroup } from 'catamaran/core/mui';
import { Metric, MetricType } from 'store/slices/contracts/types';
import { selectUserTimeZone } from 'store/slices/session';
import {
  updateMetricAllDay,
  updateMetricValidEndTime,
  updateMetricValidStartTime
} from 'store/slices/contracts/slice';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import TimeSelector from '../TimeSelector';
import clsx from 'clsx';
import moment from 'moment';

type Props = {
  metric?: Metric;
  metricType?: MetricType;
};

const getDoubleDigit = (value: number) => `0${value}`.slice(-2);

function convertTimeSelectToISOTimeString(hourMinute: string, timeZone: string) {
  const items = hourMinute.split(':');
  const hour = parseInt(items[0], 10);
  const minute = parseInt(items[1], 10);

  const date = moment().utcOffset(timeZone).hour(hour).minute(minute);

  return date.toISOString();
}

export function convertISOTimeStringToTimeSelect(timeString: string, timeZone: string) {
  if (!timeString) {
    return '';
  }

  const date = moment(timeString).utcOffset(timeZone);
  const hour = date.hour();
  const minute = date.minute();

  return `${getDoubleDigit(hour)}:${getDoubleDigit(minute)}`;
}

function ValidTimes(props: Props) {
  const { metric, metricType } = props;

  const { allDay = false } = metric;

  const dispatch = useTypedDispatch();
  const { t } = useTranslation();
  const timeZone = useTypedSelector(selectUserTimeZone);

  const handleAllDayChange = (event: any) => {
    const allDay = event.target.value === 'allDay';
    dispatch(updateMetricAllDay({ allDay, metricTypeId: metricType.id }));
  };

  const handleStartTimeChanged = (startTime: string) => {
    const startTimeString = convertTimeSelectToISOTimeString(startTime, timeZone);
    dispatch(updateMetricValidStartTime({ metricType, startTime: startTimeString }));
  };

  const handleEndTimeChanged = (endTime: string) => {
    const endTimeString = convertTimeSelectToISOTimeString(endTime, timeZone);
    dispatch(updateMetricValidEndTime({ endTime: endTimeString, metricType }));
  };

  const startTimeSelectValue = useMemo(
    () => convertISOTimeStringToTimeSelect(metric.validStartTime, timeZone),
    [metric.validStartTime, timeZone]
  );

  const endTimeSelectValue = useMemo(
    () => convertISOTimeStringToTimeSelect(metric.validEndTime, timeZone),
    [metric.validEndTime, timeZone]
  );

  return (
    <div className="grid gap-8">
      <CatTypography className="opacity-8 pl8" variant="caption">
        {t('contracts.edit.metrics.validIntervals.valid_times_desc')}
      </CatTypography>
      <div className="grid gap-8">
        <div className="grid gap-24 grid-auto-flow-column align-items-center">
          <RadioGroup
            className="flex align-items-center gap-24"
            onChange={handleAllDayChange}
            row
            value={allDay ? 'allDay' : 'selectInterval'}
          >
            <FormControlLabel
              className="m0"
              control={<CatRadio color="primary" size="small" />}
              label={
                <CatTypography variant="body2">
                  {t('contracts.edit.metrics.validIntervals.all_day')}
                </CatTypography>
              }
              value="allDay"
            />
            <FormControlLabel
              control={<CatRadio color="primary" size="small" />}
              label={
                <CatTypography variant="body2">
                  {t('contracts.edit.metrics.validIntervals.select_interval')}
                </CatTypography>
              }
              value="selectInterval"
            />
          </RadioGroup>
          <CatTypography
            className="radius-8 opacity-8 p4 border-1 border-solid border-light-grey"
            variant="body1"
          >
            UTC <b>{timeZone}</b>
          </CatTypography>
        </div>
        <div
          className={clsx({
            'grid grid-auto-flow-column align-items-center gap-16 justify-content-end': true,
            'pointer-events-none opacity-4': allDay
          })}
        >
          <TimeSelector
            defaultValue={startTimeSelectValue}
            onChange={(e: any) => handleStartTimeChanged(e.target.value)}
            style={{ width: '112px' }}
          />
          <TimeSelector
            defaultValue={endTimeSelectValue}
            onChange={(e: any) => handleEndTimeChanged(e.target.value)}
            style={{ width: '112px' }}
          />
        </div>
      </div>
    </div>
  );
}

export default ValidTimes;
