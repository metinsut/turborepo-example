import { CatRadio, CatTypography } from 'catamaran/core';
import { FormControlLabel, RadioGroup } from 'catamaran/core/mui';
import {
  allDayUpdated,
  validEndTimeUpdated,
  validStartTimeUpdated
} from 'store/slices/metricsConfiguration/detail/slice';
import { selectUserTimeZone } from 'store/slices/session';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import TimeSelector from '../Common/TimeSelector';
import clsx from 'clsx';
import moment from 'moment';

type Props = {
  allDay?: boolean;
  validStartTime?: string;
  validEndTime?: string;
};

const getDoubleDigit = (value: number) => `0${value}`.slice(-2);

const convertTimeSelectToISOTimeString = (hourMinute: string, timeZone: string) => {
  const items = hourMinute.split(':');
  const hour = parseInt(items[0], 10);
  const minute = parseInt(items[1], 10);

  const date = moment().utcOffset(timeZone).hour(hour).minute(minute);

  return date.toISOString();
};

const convertISOTimeStringToTimeSelect = (timeString: string, timeZone: string) => {
  if (!timeString) {
    return '';
  }

  const date = moment(timeString).utcOffset(timeZone);
  const hour = date.hour();
  const minute = date.minute();

  return `${getDoubleDigit(hour)}:${getDoubleDigit(minute)}`;
};

const ValidTimes = (props: Props) => {
  const { allDay = false, validStartTime, validEndTime } = props;
  const dispatch = useTypedDispatch();
  const { t } = useTranslation();
  const timeZone = useTypedSelector(selectUserTimeZone);

  const handleAllDayChange = (event: any) => {
    const allDay = event.target.value === 'allDay';
    dispatch(allDayUpdated(allDay));
  };

  const handleStartTimeChanged = (startTime: string) => {
    const startTimeString = convertTimeSelectToISOTimeString(startTime, timeZone);
    dispatch(validStartTimeUpdated(startTimeString));
  };

  const handleEndTimeChanged = (endTime: string) => {
    const endTimeString = convertTimeSelectToISOTimeString(endTime, timeZone);
    dispatch(validEndTimeUpdated(endTimeString));
  };

  const startTimeSelectValue = useMemo(
    () => convertISOTimeStringToTimeSelect(validStartTime, timeZone),
    [timeZone, validStartTime]
  );

  const endTimeSelectValue = useMemo(
    () => convertISOTimeStringToTimeSelect(validEndTime, timeZone),
    [validEndTime, timeZone]
  );

  return (
    <div className="grid gap-8">
      <CatTypography className="opacity-8 pl8" variant="caption">
        {t('metrics_configuration.detail.valid_intervals.valid_times')}
      </CatTypography>
      <div className="grid gap-8">
        <div className="grid gap-24 grid-auto-flow-column align-items-center">
          <RadioGroup
            className="flex align-items-center gap-16"
            onChange={handleAllDayChange}
            row
            value={allDay ? 'allDay' : 'selectInterval'}
          >
            <FormControlLabel
              className="m0"
              control={<CatRadio color="primary" size="small" />}
              label={
                <CatTypography className={clsx(allDay ? 'font-bold' : '')} variant="body2">
                  {t('metrics_configuration.detail.valid_intervals.all_day')}
                </CatTypography>
              }
              sx={{ minWidth: '100px' }}
              value="allDay"
            />
            <FormControlLabel
              control={<CatRadio color="primary" size="small" />}
              label={
                <CatTypography className={clsx(allDay ? '' : 'font-bold')} variant="body2">
                  {t('metrics_configuration.detail.valid_intervals.select_interval')}
                </CatTypography>
              }
              sx={{ minWidth: '110px' }}
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
};

export default ValidTimes;
