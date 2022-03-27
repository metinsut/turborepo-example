import { HistoryType } from 'store/slices/breakdown/taskDetail/types';
import { IconBaseProps } from 'catamaran/icons/IconBase';
import BreakdownIcon from 'catamaran/icons/Breakdown';
import CostIcon from 'catamaran/icons/Cost';
import InfoIcon from 'catamaran/icons/Info';
import NotUsableIcon from 'catamaran/icons/NotUsable';
import PersonIcon from 'catamaran/icons/Person';
import React from 'react';
import StatusIcon from 'catamaran/icons/Status';

type Props = IconBaseProps & {
  className?: string;
  updateType?: HistoryType;
};

function UpdateIcon(props: Props) {
  const { className, updateType, ...rest } = props;

  let IconComponent;
  switch (updateType) {
    case 'information':
      IconComponent = InfoIcon;
      break;
    case 'status':
      IconComponent = StatusIcon;
      break;
    case 'assignment':
      IconComponent = PersonIcon;
      break;
    case 'usability':
      IconComponent = NotUsableIcon;
      break;
    case 'typeOfBreakdown':
      IconComponent = BreakdownIcon;
      break;
    case 'cost':
      IconComponent = CostIcon;
      break;
    default:
      IconComponent = InfoIcon;
      break;
  }

  return (
    <IconComponent
      className={className}
      color="darkGrey"
      fontSize="small"
      hoverable={false}
      {...rest}
    />
  );
}

export default UpdateIcon;
