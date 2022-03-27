import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps;

function NoItem(props: Props) {
  return (
    <IconBase {...props}>
      <rect height={14} rx={2} stroke="currentColor" strokeWidth={2} width={6} x={9} y={5} />
      <path d="M15 6L9 18" stroke="currentColor" strokeLinecap="round" strokeWidth={1.5} />
    </IconBase>
  );
}

export default NoItem;
