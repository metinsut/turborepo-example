import { Box } from 'catamaran/core';
import { Metric } from 'store/slices/contracts/types';
import { SectionWrapperProps, withSectionWrapper } from 'views/Contracts/withSectionWrapper';
import { Trans, useTranslation } from 'react-i18next';
import { Typography } from 'catamaran/core/mui';
import { convertISOTimeStringToTimeSelect } from '../ValidIntervals/ValidTimes';
import { selectUserTimeZone } from 'store/slices/session';
import { useDaysOfWeek } from 'hooks/useDaysOfWeek';
import { useTypedSelector } from 'hooks';
import React, { useMemo } from 'react';
import UpdateIcon from 'catamaran/icons/Update';

type Props = SectionWrapperProps & {
  metric: Metric;
};

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function ValidIntervals(props: Props) {
  const { metric } = props;
  const { t } = useTranslation();

  const availableDays = useDaysOfWeek(true);

  const selectedIndexes = useMemo(() => {
    if (metric && metric.days && metric.days.length > 0) {
      return metric.days.map((day) => days.findIndex((d) => d === day));
    }
    return [];
  }, [metric]);

  const timeZone = useTypedSelector(selectUserTimeZone);

  return (
    <>
      <Box alignItems="center" display="flex" flexDirection="row" py={1}>
        <UpdateIcon fontSize="small" />
        <Box px="4px" />
        <Typography variant="body2">{t('contracts.edit.metrics.validIntervals.title')}</Typography>
      </Box>
      <Box alignItems="center" display="flex" flexDirection="row" px={3}>
        <Typography variant="caption">
          {metric.allDay ? (
            t('contracts.edit.metrics.validIntervals.all_day')
          ) : (
            <>
              {convertISOTimeStringToTimeSelect(metric.validStartTime, timeZone)}-
              {convertISOTimeStringToTimeSelect(metric.validEndTime, timeZone)}
              {` (UTC${timeZone})`}
            </>
          )}
        </Typography>
        <Typography alignSelf="center" className="px8" style={{ opacity: '0.2' }} variant="caption">
          |
        </Typography>
        <Typography variant="caption">
          {selectedIndexes.map((dayIndex) => ` ${availableDays[dayIndex]} `)}
        </Typography>
        <Typography alignSelf="center" className="px8" style={{ opacity: '0.2' }} variant="caption">
          |
        </Typography>
        <Typography variant="caption">
          {metric.holidaysIncluded ? (
            <Trans
              components={{ bold: <b /> }}
              i18nKey="contracts.edit.metrics.validIntervals.holidays_not_included_display"
              t={t}
            />
          ) : (
            <Trans
              components={{ bold: <b /> }}
              i18nKey="contracts.edit.metrics.validIntervals.holidays_included_display"
              t={t}
            />
          )}
        </Typography>
      </Box>
    </>
  );
}

export default withSectionWrapper(ValidIntervals);
