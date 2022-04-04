import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps;

function SignIcon(props: Props) {
  return (
    <IconBase {...props}>
      <circle cx={12} cy={12} opacity={0.8} r={3} stroke="currentColor" strokeWidth={2} />
    </IconBase>
  );
}

export default SignIcon;
