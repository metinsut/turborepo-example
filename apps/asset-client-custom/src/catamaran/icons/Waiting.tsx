import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps;

function WaitingIcon(props: Props) {
  return (
    <IconBase {...props}>
      <path
        d="M9 8v.469c0 .724.36 1.419 1 1.931l.293.234c.453.362.707.854.707 1.366v.469c0 .724-.36 1.419-1 1.931l-.293.234C9.254 14.996 9 15.488 9 16M15 8v.469c0 .724-.36 1.419-1 1.931l-.293.234c-.453.362-.707.854-.707 1.366v.469c0 .724.36 1.419 1 1.931l.293.234c.453.362.707.854.707 1.366"
        stroke="currentColor"
        strokeWidth={1.5}
      />
      <rect fill="currentColor" height={2} rx={1} width={10} x={7} y={6} />
      <rect fill="currentColor" height={2} rx={1} width={10} x={7} y={16} />
    </IconBase>
  );
}

export default WaitingIcon;
