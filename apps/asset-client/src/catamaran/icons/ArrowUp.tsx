import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps;

function ArrowUpIcon(props: Props) {
  return (
    <IconBase {...props}>
      <path
        d="M9 14l3-4 3 4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </IconBase>
  );
}

export default ArrowUpIcon;
