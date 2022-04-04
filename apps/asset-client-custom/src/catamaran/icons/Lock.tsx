import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps;

function LockIcon(props: Props) {
  return (
    <IconBase {...props}>
      <path d="M15 10V7a2 2 0 00-2-2h-2a2 2 0 00-2 2v3" stroke="currentColor" strokeWidth={1.5} />
      <rect fill="currentColor" height={10} rx={2} width={10} x={7} y={9} />
    </IconBase>
  );
}

export default LockIcon;
