import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps;

function AuthSignGreyIcon(props: Props) {
  return (
    <IconBase {...props}>
      <circle cx={12} cy={12} opacity={0.8} r={3} stroke="#494949" strokeWidth={2} />
    </IconBase>
  );
}

export default AuthSignGreyIcon;
