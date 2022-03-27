import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps;

function OkIcon(props: Props) {
  return (
    <IconBase {...props}>
      <path
        d="M9 12l2 2 4-4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={3}
      />
    </IconBase>
  );
}

export default OkIcon;
