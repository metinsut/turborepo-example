import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps;

function StatusIcon(props: Props) {
  return (
    <IconBase {...props} fill="none">
      <circle cx={12} cy={12} fill="currentColor" opacity={0.1} r={12} />
      <g fill="currentColor" opacity={0.8}>
        <circle cx={12} cy={12} opacity={0.4} r={7.2} />
        <circle cx={12} cy={12} r={3.6} />
      </g>
    </IconBase>
  );
}

export default StatusIcon;
