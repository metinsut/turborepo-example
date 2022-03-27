import { Box } from 'catamaran/core';
import { Metric, MetricType } from 'store/slices/contracts/types';
import { Paper, Theme, makeStyles } from 'catamaran/core/mui';
import { getContractMetric } from 'store/slices/contracts/actions';
import { metricDefinitions } from 'store/slices/contracts/data';
import { selectInitialMetric } from 'store/slices/contracts/selectors';
import { useTypedSelector } from 'hooks/useTypedSelector';
import DowntimeRules from './DowntimeRules';
import Goals from './Goals/Goals';
import Header from './Header';
import MetricIcon from '../MetricIcon';
import React, { useEffect, useMemo } from 'react';
import RowLoadingSkeleton from './RowLoadingSkeleton';
import TimeTolerance from './TimeTolerance';
import ValidIntervals from './ValidIntervals';
import clsx from 'clsx';
import useLoading from 'hooks/useLoading';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.lightGrey.main,
    borderRadius: theme.spacing(2),
    margin: theme.spacing(1, 1, 0, 0),
    padding: theme.spacing(1, 1, 2, 1),
    width: 512
  }
}));

type Props = {
  className?: string;
  contractId: string;
  onEdit: () => void;
  metricType: MetricType;
};

function ReadonlyMetricCard(props: Props) {
  const { className, contractId, onEdit, metricType } = props;
  const classes = useStyles();

  const [metricLoading, metricLoadingDispatch] = useLoading<Metric>();

  const metric = useTypedSelector((state) => selectInitialMetric(state, metricType.id));
  const metricDefinition = useMemo(
    () => metricDefinitions.find((i) => i.metricType.name === metricType.name),
    [metricType.name]
  );

  useEffect(() => {
    async function fetchMetric() {
      await metricLoadingDispatch(getContractMetric(contractId, metricType.id));
    }

    fetchMetric();
  }, [contractId, metricLoadingDispatch, metricType.id]);

  return (
    <Paper className={clsx(classes.root, className)}>
      <Box display="flex" flexDirection="row">
        <MetricIcon metricType={metricType} />
        <Box display="flex" flexDirection="column" flexGrow={1} paddingLeft="8px">
          <Header contractId={contractId} metricType={metricType} onEdit={onEdit} />
          {metricLoading || !metric ? (
            <Box display="flex" flexDirection="column">
              <RowLoadingSkeleton />
              <RowLoadingSkeleton />
              <RowLoadingSkeleton />
              <RowLoadingSkeleton />
            </Box>
          ) : (
            <Box opacity={0.8}>
              <ValidIntervals
                metric={metric}
                sectionProps={metricDefinition.properties?.validIntervals}
              />
              <DowntimeRules
                metric={metric}
                metricType={metricType}
                sectionProps={metricDefinition.properties?.downtimeRules}
              />
              <TimeTolerance
                metric={metric}
                sectionProps={metricDefinition.properties?.timeTolerance}
              />
              <Goals
                metric={metric}
                metricType={metricType}
                sectionProps={metricDefinition.properties?.metricGoals}
              />
            </Box>
          )}
        </Box>
      </Box>
    </Paper>
  );
}

export default ReadonlyMetricCard;
