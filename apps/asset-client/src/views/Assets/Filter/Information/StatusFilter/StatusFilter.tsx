import { AssetStatus } from 'store/slices/common/types';
import { Box } from 'catamaran/core';
import { Theme, makeStyles } from 'catamaran/core/mui';
import { assetStatuses } from 'store/slices/common/data';
import { selectDraftFilterInformationStatusTypes } from 'store/slices/asset/filter/selectors';
import { setFilterInformationStatus } from 'store/slices/asset/filter/slice';
import { useTypedDispatch, useTypedSelector } from 'hooks';
import StatusCheckbox from './StatusCheckbox';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginBottom: '12px',
    width: '100%'
  }
}));

type Props = {
  className?: string;
};

function StatusFilter(props: Props) {
  const classes = useStyles();
  const { className } = props;
  const dispatch = useTypedDispatch();

  const selectedStatuses = useTypedSelector(selectDraftFilterInformationStatusTypes);

  const handleCheckboxClick = (selectedStatusType: AssetStatus) => {
    dispatch(setFilterInformationStatus(selectedStatusType));
  };

  return (
    <Box center className={clsx(classes.root, className)} flex>
      <Box flex width="75%">
        {assetStatuses.map((status) => (
          <StatusCheckbox
            checked={selectedStatuses.includes(status)}
            key={`${status}-checkbox`}
            onChange={() => handleCheckboxClick(status)}
            status={status}
          />
        ))}
      </Box>
    </Box>
  );
}

export default StatusFilter;
