import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps;

function AndMoreIcon(props: Props) {
  return (
    <IconBase viewBox="0 0 16 4" {...props}>
      <circle cx={2} cy={2} fill="currentColor" opacity={0.8} r={2} />
      <circle cx={8} cy={2} fill="currentColor" opacity={0.6} r={2} />
      <circle cx={14} cy={2} fill="currentColor" opacity={0.4} r={2} />
    </IconBase>
  );
}

export default AndMoreIcon;
