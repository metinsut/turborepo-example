import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps;

function MinusIcon(props: Props) {
  return (
    <IconBase {...props} viewBox="0 0 24 24">
      <path d="M9 12h6" stroke="currentColor" strokeLinecap="round" strokeWidth={2} />
    </IconBase>
  );
}

export default MinusIcon;
