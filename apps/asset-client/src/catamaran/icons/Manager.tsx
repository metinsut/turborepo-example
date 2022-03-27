import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps;

function ManagerIcon(props: Props) {
  return (
    <IconBase {...props} viewBox="0 0 24 24">
      <g opacity={0.8} stroke="currentColor" strokeWidth={1.5}>
        <circle cx={12} cy={12} r={8.25} />
        <path d="M9.75 12l1.5 1.5 3-3" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </IconBase>
  );
}

export default ManagerIcon;
