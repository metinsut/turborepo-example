import { CatTooltip } from 'catamaran/core';
import { IconBaseProps } from 'catamaran/icons/IconBase';
import { StatusKeys } from 'store/slices/tasks/common/type';
import { useTranslation } from 'react-i18next';
import React from 'react';
import StatusClosedIcon from 'catamaran/icons/StatusClosed';
import StatusDeniedIcon from 'catamaran/icons/StatusDenied';
import StatusInProgressIcon from 'catamaran/icons/StatusInProgress';
import StatusOpenIcon from 'catamaran/icons/StatusOpen';
import StatusPausedIcon from 'catamaran/icons/StatusPaused';
import StatusWaitingIcon from 'catamaran/icons/StatusWaiting';

type Props = IconBaseProps & {
  className?: string;
  statusType: StatusKeys;
};

function StatusIcon(props: Props) {
  const { className, statusType, ...rest } = props;
  const { t } = useTranslation();

  const IconComponent = getStatusIconComponent(statusType);

  return (
    <CatTooltip title={t(`tasks.common.statuses.${statusType}`)}>
      <div>
        <IconComponent alwaysHovered className={className} fontSize="small" {...rest} />
      </div>
    </CatTooltip>
  );
}

export const getStatusIconComponent = (
  statusType: StatusKeys
): React.ElementType<IconBaseProps> => {
  let IconComponent;

  switch (statusType) {
    case 'waitingForConfirmation':
      IconComponent = StatusWaitingIcon;
      break;
    case 'open':
      IconComponent = StatusOpenIcon;
      break;
    case 'inProgress':
      IconComponent = StatusInProgressIcon;
      break;
    case 'paused':
      IconComponent = StatusPausedIcon;
      break;
    case 'closed':
      IconComponent = StatusClosedIcon;
      break;
    case 'denied':
      IconComponent = StatusDeniedIcon;
      break;
    default:
      IconComponent = StatusClosedIcon;
      break;
  }

  return IconComponent;
};

export default StatusIcon;
