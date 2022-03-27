import { IconBaseProps } from 'catamaran/icons/IconBase';
import { StatusKeys } from 'store/slices/taskConfiguration/breakdown/breakdownStatuses';
import React from 'react';
import StatusConfirmedIcon from 'catamaran/icons/StatusConfirmed';
import StatusInProgressIcon from 'catamaran/icons/StatusInProgress';
import StatusPausedIcon from 'catamaran/icons/StatusPaused';

type Props = IconBaseProps & {
  className?: string;
  statusKey: StatusKeys;
};

function SubstatusHeaderIcon(props: Props) {
  const { className, statusKey, ...rest } = props;

  const [IconComponent] = getStatusHeaderIconComponent(statusKey);
  return (
    <IconComponent
      className={className}
      contained={false}
      fontSize="medium"
      hoverable={false}
      {...rest}
    />
  );
}

export const getStatusHeaderIconComponent = (
  statusKey: StatusKeys
): [React.ElementType<IconBaseProps>] => {
  let IconComponent;

  switch (statusKey) {
    case 'inProgress':
      IconComponent = StatusInProgressIcon;
      break;
    case 'paused':
      IconComponent = StatusPausedIcon;
      break;
    case 'closed':
      IconComponent = StatusConfirmedIcon;
      break;
    default:
      IconComponent = StatusConfirmedIcon;
      break;
  }

  return [IconComponent];
};

export default SubstatusHeaderIcon;
