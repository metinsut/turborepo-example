import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps;

function InfoIcon(props: Props) {
  return (
    <IconBase {...props} viewBox="0 0 24 24">
      <rect fill="currentColor" height={9} rx={1.5} width={3} x={10.5} y={10} />
      <circle cx={12} cy={6.5} fill="currentColor" r={1.5} />
    </IconBase>
  );
}

export default InfoIcon;
