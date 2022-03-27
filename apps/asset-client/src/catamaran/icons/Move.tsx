import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps;

function MoveIcon(props: Props) {
  return (
    <IconBase {...props}>
      <path
        d="M6 9.5v-1a2 2 0 0 1 2-2h.798a2 2 0 0 1 1.25.438l1.678 1.343a1 1 0 0 0 .625.219H16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-.75"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth={2}
      />
      <path
        d="m9 14 2-2-2-2M10 12H5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </IconBase>
  );
}

export default MoveIcon;
