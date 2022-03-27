import { AssetStatus } from 'store/slices/common/types';
import { Box, CatCheckbox, CatTypography } from 'catamaran/core';
import { useTranslation } from 'react-i18next';
import StatusIcon from 'views/Common/AssetStatus/StatusIcon';

type Props = {
  checked: boolean;
  onChange: () => void;
  status: AssetStatus;
};

function StatusCheckbox(props: Props) {
  const { checked, onChange, status } = props;

  const { t } = useTranslation();

  return (
    <Box center flex flexGrow={1}>
      <Box center flex flexDirection="column">
        <StatusIcon className="mb8" fontSize="small" statusType={status} />
        <CatTypography variant="body2">{t(`assets.statuses.${status}`)}</CatTypography>
        <CatCheckbox checked={checked} onChange={onChange} />
      </Box>
    </Box>
  );
}

export default StatusCheckbox;
