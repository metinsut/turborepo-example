import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps;

function UpdateIcon(props: Props) {
  return (
    <IconBase {...props}>
      <path
        d="M16.9 15.586a6.071 6.071 0 00-7.466-9.088"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth={2}
      />
      <path
        d="M19.083 15.75l-2.13.988-.786-2.238"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
      <path
        d="M7.1 8.414a6.071 6.071 0 007.466 9.088"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth={2}
      />
      <path
        d="M4.917 8.25l2.13-.987.786 2.237"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </IconBase>
  );
}

export default UpdateIcon;
