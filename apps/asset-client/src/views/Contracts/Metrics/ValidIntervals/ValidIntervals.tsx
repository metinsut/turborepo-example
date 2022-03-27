import { CatCheckbox, CatTypography } from 'catamaran/core';
import { FormControlLabel } from 'catamaran/core/mui';
import { Metric, MetricType } from 'store/slices/contracts/types';
import { SectionWrapperProps, withSectionWrapper } from 'views/Contracts/withSectionWrapper';
import { updateMetricValidDaysHolidaysIncluded } from 'store/slices/contracts/slice';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch } from 'hooks';
import TimeIcon from 'catamaran/icons/Time';
import ValidIntervalDaySelector from './ValidIntervalDaySelector';
import ValidTimes from './ValidTimes';

type Props = SectionWrapperProps & {
  metric?: Metric;
  metricType?: MetricType;
};

function ValidIntervals(props: Props) {
  const { metric, metricType } = props;

  const dispatch = useTypedDispatch();
  const { t } = useTranslation();

  const handleHolidaysIncludedChanged = (holidaysIncluded: boolean) => {
    dispatch(updateMetricValidDaysHolidaysIncluded({ holidaysIncluded, metricType }));
  };

  const metricTypeResource = metricType.isDefault
    ? t(`contracts.edit.metrics.types.${metricType.name}`)
    : metricType.name;

  return (
    <div className="grid p24 gap-10">
      <div className="flex gap-8">
        <TimeIcon fontSize="small" />
        <div className="grid gap-5">
          <CatTypography className="opacity-8" variant="subtitle1">
            {t('contracts.edit.metrics.validIntervals.title')}
          </CatTypography>
          <CatTypography className="opacity-6" variant="body2">
            {t('contracts.edit.metrics.validIntervals.desc', { type: metricTypeResource })}
          </CatTypography>
        </div>
      </div>
      <div className="grid grid-auto-flow-column gap-48 justify-content-start">
        <ValidTimes metric={metric} metricType={metricType} />
        <div className="grid gap-8">
          <CatTypography className="opacity-8" variant="caption">
            {t('contracts.edit.metrics.validIntervals.valid_days_desc')}
          </CatTypography>
          <FormControlLabel
            componentsProps={{
              typography: {
                className: 'pl8'
              }
            }}
            control={
              <CatCheckbox
                checked={metric.holidaysIncluded}
                color="default"
                onChange={(event) => handleHolidaysIncludedChanged(event.target.checked)}
              />
            }
            label={<>{t('contracts.edit.metrics.validIntervals.do_not_include_holidays')}</>}
          />
          <ValidIntervalDaySelector metricType={metricType} selectedDays={metric.days} />
        </div>
      </div>
    </div>
  );
}

export default withSectionWrapper(ValidIntervals);
