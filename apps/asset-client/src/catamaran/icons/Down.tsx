import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps & {};

function DownIcon(props: Props) {
  return (
    <IconBase {...props}>
      <path
        d="M12 18l4.5-4.5M12 18l-4.5-4.5M12 16.5V6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth={3}
      />
    </IconBase>
  );
}

export default DownIcon;
