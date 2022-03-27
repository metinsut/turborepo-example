import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps;

function CheckIcon(props: Props) {
  return (
    <IconBase {...props} viewBox="0 0 25 24">
      <path
        d="m9 12 2 2 4-4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </IconBase>
  );
}

export default CheckIcon;
