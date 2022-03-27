import { IconBaseProps } from 'catamaran/icons/IconBase';
import { StatusKeys } from 'store/slices/common/types';
import React from 'react';
import StatusAllIcon from 'catamaran/icons/StatusAll';
import StatusConfirmedIcon from 'catamaran/icons/StatusConfirmed';
import StatusInProgressIcon from 'catamaran/icons/StatusInProgress';
import StatusOpenIcon from 'catamaran/icons/StatusOpen';
import StatusPausedIcon from 'catamaran/icons/StatusPaused';

type Props = IconBaseProps & {
  className?: string;
  status?: StatusKeys;
};

function StatusIcon(props: Props) {
  const { className, status, ...rest } = props;

  let IconComponent;
  switch (status) {
    case 'paused':
      IconComponent = StatusPausedIcon;
      break;
    case 'inProgress':
      IconComponent = StatusInProgressIcon;
      break;
    case 'closed':
      IconComponent = StatusConfirmedIcon;
      break;
    case 'open':
      IconComponent = StatusOpenIcon;
      break;
    default:
      IconComponent = StatusAllIcon;
      break;
  }
  return <IconComponent className={className} contained={false} hoverable={false} {...rest} />;
}

export default StatusIcon;
