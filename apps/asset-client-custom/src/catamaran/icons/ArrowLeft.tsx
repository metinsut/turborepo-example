import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps;

function ArrowLeftIcon(props: Props) {
  return (
    <IconBase {...props}>
      <path
        d="M14 15l-4-3 4-3"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </IconBase>
  );
}

export default ArrowLeftIcon;
