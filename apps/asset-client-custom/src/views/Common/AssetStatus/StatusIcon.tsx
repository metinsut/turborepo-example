import { AssetStatus } from 'store/slices/common/types';
import { CatTooltip } from 'catamaran/core';
import { ColorTypes, IconBaseProps } from 'catamaran/icons/IconBase';
import BreakdownIcon from 'catamaran/icons/Breakdown';
import CheckIcon from 'catamaran/icons/Check';
import DownIcon from 'catamaran/icons/Down';
import PassiveIcon from 'catamaran/icons/Passive';
import React from 'react';
import RetireIcon from 'catamaran/icons/Retire';
import WarningIcon from 'catamaran/icons/Warning';

type Props = IconBaseProps & {
  className?: string;
  statusType: AssetStatus;
};

function StatusIcon(props: Props) {
  const { className, statusType, ...rest } = props;

  const [IconComponent, iconColor] = getStatusIconComponent(statusType);

  return (
    <CatTooltip title={statusType}>
      <div>
        <IconComponent
          alwaysHovered
          className={className}
          color={iconColor as ColorTypes}
          {...rest}
        />
      </div>
    </CatTooltip>
  );
}

export const getStatusIconComponent = (
  statusType: AssetStatus
): [React.ElementType<IconBaseProps>, ColorTypes] => {
  let IconComponent;
  let iconColor: ColorTypes;

  switch (statusType) {
    case 'usable':
      IconComponent = CheckIcon;
      iconColor = 'green';
      break;
    case 'caution':
      IconComponent = WarningIcon;
      iconColor = 'yellow';
      break;
    case 'partialDown':
      IconComponent = BreakdownIcon;
      iconColor = 'orange';
      break;
    case 'down':
      IconComponent = DownIcon;
      iconColor = 'red';
      break;
    case 'passive':
      IconComponent = PassiveIcon;
      iconColor = 'grey';
      break;
    case 'retired':
      IconComponent = RetireIcon;
      iconColor = 'darkGrey';
      break;
    default:
      IconComponent = CheckIcon;
      iconColor = 'green';
      break;
  }

  return [IconComponent, iconColor];
};

export default StatusIcon;
