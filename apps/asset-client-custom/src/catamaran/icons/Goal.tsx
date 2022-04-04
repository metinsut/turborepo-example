import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps;

function GoalIcon(props: Props) {
  return (
    <IconBase {...props}>
      <path
        clipRule="evenodd"
        d="M12 17a5 5 0 10-4.94-4.218l-1.928.578a7 7 0 115.508 5.508l.578-1.929c.255.04.516.061.782.061zm-.198-2.006a3 3 0 10-2.796-2.796l1.516-.455a1.5 1.5 0 111.735 1.735l-.455 1.516z"
        fill="currentColor"
        fillRule="evenodd"
      />
      <path
        d="M10 13l1.5-.5L11 14"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.646 16.646a.5.5 0 00.708.708l-.708-.708zm4-4l-4 4 .708.708 4-4-.708-.708z"
        fill="currentColor"
      />
    </IconBase>
  );
}

export default GoalIcon;
