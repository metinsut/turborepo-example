import { CatCheckbox, CatTypography } from 'catamaran/core';
import { FormControlLabel } from 'catamaran/core/mui';
import { holidaysIncludedUpdated } from 'store/slices/metricsConfiguration/detail/slice';
import {
  selectDraftAllDay,
  selectDraftHolidaysIncluded,
  selectDraftValidEndTime,
  selectDraftValidStartTime
} from 'store/slices/metricsConfiguration/detail/selectors';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import UpdateIcon from 'catamaran/icons/Update';
import ValidIntervalDaySelector from './ValidIntervalDaySelector';
import ValidTimes from './ValidTimes';

const ValidIntervals = () => {
  const { t } = useTranslation();
  const dispatch = useTypedDispatch();
  const allDay = useTypedSelector(selectDraftAllDay);
  const holidaysIncluded = useTypedSelector(selectDraftHolidaysIncluded);
  const validStartTime = useTypedSelector(selectDraftValidStartTime);
  const validEndTime = useTypedSelector(selectDraftValidEndTime);

  const handleHolidaysIncludedChanged = (holidaysIncluded: boolean) => {
    dispatch(holidaysIncludedUpdated(holidaysIncluded));
  };

  return (
    <div className="grid p24 gap-10">
      <div className="flex gap-8">
        <UpdateIcon fontSize="small" />
        <div className="grid gap-5">
          <CatTypography className="opacity-8" variant="subtitle1">
            {t('metrics_configuration.detail.valid_intervals.title')}
          </CatTypography>
          <CatTypography className="opacity-6" variant="body2">
            {t('metrics_configuration.detail.valid_intervals.desc')}
          </CatTypography>
        </div>
      </div>
      <div className="grid grid-auto-flow-column gap-48 justify-content-start">
        <ValidTimes allDay={allDay} validEndTime={validEndTime} validStartTime={validStartTime} />
        <div className="grid gap-8">
          <CatTypography className="opacity-8" variant="caption">
            {t('metrics_configuration.detail.valid_intervals.valid_days')}
          </CatTypography>
          <FormControlLabel
            componentsProps={{
              typography: {
                className: 'pl8'
              }
            }}
            control={
              <CatCheckbox
                checked={holidaysIncluded}
                color="default"
                onChange={(event) => handleHolidaysIncludedChanged(event.target.checked)}
              />
            }
            label={
              <> {t('metrics_configuration.detail.valid_intervals.do_not_include_holidays')}</>
            }
          />
          <ValidIntervalDaySelector />
        </div>
      </div>
    </div>
  );
};

export default ValidIntervals;
