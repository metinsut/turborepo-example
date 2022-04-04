import { IconBaseProps } from 'catamaran/icons/IconBase';
import { Tooltip } from 'catamaran/core/mui';
import { WorkType } from 'store/slices/common/types';
import { useTranslation } from 'react-i18next';
import BreakdownIcon from 'catamaran/icons/Breakdown';
import CalibrationIcon from 'catamaran/icons/Calibration';
import MaintenanceIcon from 'catamaran/icons/Maintenance';
import RetireIcon from 'catamaran/icons/Retire';

type Props = IconBaseProps & {
  workType?: WorkType;
};

function WorkTypeIcon(props: Props) {
  const { t } = useTranslation();
  const { workType, ...rest } = props;

  let IconComponent;
  switch (workType) {
    case 'breakdown':
      IconComponent = BreakdownIcon;
      break;
    case 'maintenance':
      IconComponent = MaintenanceIcon;
      break;
    case 'calibration':
      IconComponent = CalibrationIcon;
      break;
    case 'retirement':
      IconComponent = RetireIcon;
      break;
    default:
      IconComponent = BreakdownIcon;
      break;
  }
  return (
    <Tooltip arrow placement="bottom" title={t(`task_management.work_types.${workType}`)}>
      <div>
        <IconComponent color="darkGrey" contained={false} hoverable={false} {...rest} />
      </div>
    </Tooltip>
  );
}

export default WorkTypeIcon;
