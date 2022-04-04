import { Box } from 'catamaran/core';
import { MetricType } from 'store/slices/contracts/types';
import AddButton from './AddButton';

type Props = {
  metricTypes: MetricType[];
  onAddClick?: (metricType: MetricType) => void;
};

function AddSection(props: Props) {
  const { metricTypes, onAddClick } = props;

  return (
    <Box flex flexDirection="row" flexWrap="wrap" mt={2}>
      {metricTypes.map((type) => (
        <AddButton key={type.id} metricType={type} onAddClick={onAddClick} />
      ))}
    </Box>
  );
}

export default AddSection;
