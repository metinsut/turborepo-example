import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps;

function AdditionalPermIcon(props: Props) {
  return (
    <IconBase {...props}>
      <path d="M6 12h12M12 18V6" stroke="currentColor" strokeLinecap="round" strokeWidth={3} />
    </IconBase>
  );
}

export default AdditionalPermIcon;
