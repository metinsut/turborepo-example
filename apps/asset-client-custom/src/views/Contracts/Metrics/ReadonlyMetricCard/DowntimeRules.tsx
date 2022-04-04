import { Box, Theme, Typography, makeStyles } from 'catamaran/core/mui';
import { Metric, MetricType } from 'store/slices/contracts/types';
import { SectionWrapperProps, withSectionWrapper } from 'views/Contracts/withSectionWrapper';
import { useTranslation } from 'react-i18next';
import { useUniqueIds } from 'hooks/useUniqueIds';
import CalculationIcon from 'catamaran/icons/Calculation';
import DowntimeRuleResult from '../DowntimeRules/DowntimeRuleResult';
import React from 'react';
import SignIcon from 'catamaran/icons/Sign';

const useStyles = makeStyles((theme: Theme) => ({
  root: {}
}));

type Props = SectionWrapperProps & {
  metric: Metric;
  metricType: MetricType;
};

function DowntimeRules(props: Props) {
  const classes = useStyles();
  const { t } = useTranslation();
  const { metric, metricType } = props;
  const uniqueIds = useUniqueIds(metric?.downtimeRules?.length);

  if (!metric) {
    return null;
  }

  return (
    <>
      <Box alignItems="center" display="flex" flexDirection="row" py={1}>
        <CalculationIcon fontSize="small" />
        <Box px="4px" />
        <Typography variant="body2">{t('contracts.edit.metrics.downTimeRules.title')}</Typography>
      </Box>
      <Box display="flex" flexDirection="column" px={2}>
        {metric.downtimeRules.map((downtimeRule, index) => (
          <Box
            display="flex"
            flexDirection="row"
            key={uniqueIds[index]}
            marginTop={index === 0 ? 0 : 0.3}
          >
            <SignIcon />
            <Typography variant="caption">
              <DowntimeRuleResult downtimeRule={downtimeRule} metricType={metricType} />
            </Typography>
          </Box>
        ))}
      </Box>
    </>
  );
}

export default withSectionWrapper(DowntimeRules);
