import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps;

function ChevronDownIcon(props: Props) {
  return (
    <IconBase {...props}>
      <path
        d="M8 11l4 4 4-4"
        opacity={0.8}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={3}
      />
    </IconBase>
  );
}

export default ChevronDownIcon;
