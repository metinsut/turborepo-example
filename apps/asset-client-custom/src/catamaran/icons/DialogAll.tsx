import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps;

function DialogAllIcon(props: Props) {
  return (
    <IconBase {...props}>
      <path
        d="M12 7.5v9M7.5 12h9M8.818 15.182l6.364-6.364M15.182 15.182L8.818 8.818"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth={2}
      />
    </IconBase>
  );
}

export default DialogAllIcon;
