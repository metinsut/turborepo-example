import { IconBaseProps } from 'catamaran/icons/IconBase';
import { RelationType } from 'components/DateFilter/types';
import CancelIcon from 'catamaran/icons/Cancel';
import DialogAllIcon from 'catamaran/icons/DialogAll';
import DialogBetweenIcon from 'catamaran/icons/DialogBetween';
import DialogExactIcon from 'catamaran/icons/DialogExact';
import DialogGreaterIcon from 'catamaran/icons/DialogGreater';
import DialogLesserIcon from 'catamaran/icons/DialogLesser';
import React from 'react';

type Props = IconBaseProps & {
  className?: string;
  relation: RelationType;
};

function StatusIcon(props: Props) {
  const { className, relation, ...rest } = props;

  const IconComponent = getStatusIconComponent(relation);
  return <IconComponent alwaysHovered className={className} fontSize="small" {...rest} />;
}

export const getStatusIconComponent = (relation: RelationType) => {
  let IconComponent;

  switch (relation) {
    case 'any':
      IconComponent = DialogAllIcon;
      break;
    case 'blank':
      IconComponent = CancelIcon;
      break;
    case 'between':
      IconComponent = DialogBetweenIcon;
      break;
    case 'equal':
      IconComponent = DialogExactIcon;
      break;
    case 'greaterThan':
      IconComponent = DialogGreaterIcon;
      break;
    case 'lessThan':
      IconComponent = DialogLesserIcon;
      break;
    default:
      IconComponent = CancelIcon;
      break;
  }

  return IconComponent;
};

export default StatusIcon;
