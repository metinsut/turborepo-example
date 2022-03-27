import { Box } from 'catamaran/core';
import { MetricType } from 'store/slices/contracts/types';
import React from 'react';
import ReadonlyMetricCard from './ReadonlyMetricCard/ReadonlyMetricCard';

type Props = {
  contractId: string;
  metricTypes: MetricType[];
  onEdit: (metricType: MetricType) => void;
};

function ReadonlySection(props: Props) {
  const { contractId, metricTypes, onEdit } = props;

  return (
    <Box display="flex" flexDirection="row" flexWrap="wrap" mt={1}>
      {metricTypes.map((type) => (
        <ReadonlyMetricCard
          contractId={contractId}
          key={type.id}
          metricType={type}
          onEdit={() => onEdit(type)}
        />
      ))}
    </Box>
  );
}

export default ReadonlySection;
