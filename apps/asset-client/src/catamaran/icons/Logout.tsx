import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps;

function LogoutIcon(props: Props) {
  return (
    <IconBase {...props}>
      <path
        d="M11.167 16.167H15a2 2 0 002-2V9.833a2 2 0 00-2-2h-3.833"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
      <path d="M12 12H7" stroke="currentColor" strokeLinecap="round" strokeWidth={2} />
      <path
        d="M9 14l-2-2 2-2"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </IconBase>
  );
}

export default LogoutIcon;
