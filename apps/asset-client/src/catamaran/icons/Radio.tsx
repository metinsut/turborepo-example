import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

function RadioIcon(props: IconBaseProps) {
  return (
    <IconBase {...props}>
      <rect height={16} rx={8} stroke="currentColor" strokeWidth={2} width={16} x={4} y={4} />
    </IconBase>
  );
}

export default RadioIcon;
