import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps & {};

function SupplyTime(props: Props) {
  return (
    <IconBase {...props}>
      <path
        clipRule="evenodd"
        d="M10 7a1 1 0 00-1 1v8a1 1 0 001 1h8a1 1 0 001-1V8a1 1 0 00-1-1h-8zm0 1.5a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7a.5.5 0 01-.5-.5zm4 7a.5.5 0 01.5-.5h3a.5.5 0 010 1h-3a.5.5 0 01-.5-.5zm2.646-3.146a.5.5 0 00.708-.708l-1-1a.5.5 0 00-.708 0l-1 1a.5.5 0 00.708.708l.146-.147V14a.5.5 0 001 0v-1.793l.146.147z"
        fill="currentColor"
        fillRule="evenodd"
      />
      <rect fill="currentColor" height={1} rx={0.5} width={2} x={6} y={13} />
      <rect fill="currentColor" height={1} rx={0.5} width={3} x={5} y={14.5} />
      <rect fill="currentColor" height={1} rx={0.5} width={4} x={4} y={16} />
    </IconBase>
  );
}

export default SupplyTime;
