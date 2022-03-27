import { Box } from 'catamaran/core';
import { Metric } from 'store/slices/contracts/types';
import { SectionWrapperProps, withSectionWrapper } from 'views/Contracts/withSectionWrapper';
import { Theme, Typography, makeStyles } from 'catamaran/core/mui';
import { Trans, useTranslation } from 'react-i18next';
import React from 'react';
import TimeIcon from 'catamaran/icons/Time';

const useStyles = makeStyles((theme: Theme) => ({
  root: {}
}));

type Props = SectionWrapperProps & {
  metric: Metric;
};

function TimeTolerance(props: Props) {
  const classes = useStyles();
  const { metric } = props;
  const { t } = useTranslation();

  if (!metric?.timeTolerance) {
    return null;
  }

  return (
    <>
      <Box alignItems="center" display="flex" flexDirection="row" py={1}>
        <TimeIcon fontSize="small" />
        <Box px="4px" />
        <Typography variant="body2">
          {t('contracts.edit.metrics.time_tolerance.time_tolerance')}
        </Typography>
      </Box>
      <Box display="flex" flexDirection="row" px={3}>
        <Typography variant="caption">
          <Trans
            i18nKey="contracts.edit.metrics.time_tolerance.tolerance_description"
            t={t}
            values={{ value: metric.timeTolerance }}
          />
        </Typography>
      </Box>
    </>
  );
}

export default withSectionWrapper(TimeTolerance);
