import { Box } from 'catamaran/core';
import { Metric, MetricType } from 'store/slices/contracts/types';
import { SectionWrapperProps, withSectionWrapper } from 'views/Contracts/withSectionWrapper';
import { Theme, Typography, makeStyles } from 'catamaran/core/mui';
import { useTranslation } from 'react-i18next';
import { useUniqueIds } from 'hooks/useUniqueIds';
import GoalIcon from 'catamaran/icons/Goal';
import GoalItem from './GoalItem';
import React from 'react';

const useStyles = makeStyles((theme: Theme) => ({
  root: {}
}));

type Props = SectionWrapperProps & {
  metric: Metric;
  metricType: MetricType;
};

function Goals(props: Props) {
  const classes = useStyles();
  const { metric, metricType } = props;

  const { t } = useTranslation();
  const metricTypeResource = metricType.isDefault
    ? t(`contracts.edit.metrics.types.${metricType.name}`)
    : metricType.name;
  const uniqueIds = useUniqueIds(metric?.goals?.length);

  return (
    <>
      <Box alignItems="center" display="flex" flexDirection="row" py={1}>
        <GoalIcon fontSize="small" />
        <Box px="4px" />
        <Typography variant="body2">
          {t('contracts.edit.metrics.goals.goals_header', { type: metricTypeResource })}
        </Typography>
      </Box>
      <Box display="flex" flexDirection="column" px={3}>
        {metric &&
          metric.goals &&
          metric.goals.map((goal, index) => (
            <GoalItem
              goal={goal}
              isDefaultGoal={index === 0}
              key={uniqueIds[index]}
              metricType={metricType}
              totalGoalCount={metric.goals.length}
            />
          ))}
      </Box>
    </>
  );
}

export default withSectionWrapper(Goals);
