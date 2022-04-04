import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps;

function ArrowDownIcon(props: Props) {
  return (
    <IconBase {...props}>
      <path
        d="M15 10l-3 4-3-4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </IconBase>
  );
}

export default ArrowDownIcon;
