import { CatTooltip } from 'catamaran/core';
import { ColorTypes, IconBaseProps } from 'catamaran/icons/IconBase';
import { Priority } from 'store/slices/breakdown/common/types';
import PriorityHighIcon from 'catamaran/icons/PriorityHigh';
import PriorityLowIcon from 'catamaran/icons/PriorityLow';
import PriorityMediumIcon from 'catamaran/icons/PriorityMedium';
import React from 'react';

type Props = IconBaseProps & {
  className?: string;
  priorityType: Priority;
};

function PriorityIcon(props: Props) {
  const { className, priorityType, ...rest } = props;

  const [IconComponent, iconColor] = getPriorityIconComponent(priorityType);

  return (
    priorityType !== 'none' && (
      <CatTooltip title={priorityType}>
        <span>
          <IconComponent
            className={className}
            color={iconColor as ColorTypes}
            contained={false}
            hoverable={false}
            {...rest}
          />
        </span>
      </CatTooltip>
    )
  );
}

export const getPriorityIconComponent = (
  priorityType: Priority
): [React.ElementType<IconBaseProps>, ColorTypes] => {
  let IconComponent;
  let iconColor: ColorTypes;

  switch (priorityType) {
    case 'low':
      IconComponent = PriorityLowIcon;
      iconColor = 'darkGrey';
      break;
    case 'medium':
      IconComponent = PriorityMediumIcon;
      iconColor = 'orange';
      break;
    case 'high':
      IconComponent = PriorityHighIcon;
      iconColor = 'red';
      break;
    default:
      IconComponent = PriorityLowIcon;
      iconColor = 'lightGrey';
      break;
  }

  return [IconComponent, iconColor];
};

export default PriorityIcon;
