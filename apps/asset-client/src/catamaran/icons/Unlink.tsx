import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps & {};

function UnlinkIcon(props: Props) {
  return (
    <IconBase {...props}>
      <path
        d="M3.778 8.207l1.582 1.39M2.589 11.416l1.15.664M5.846 4.941l1.595 3.226M20.222 15.793l-1.582-1.39M21.411 12.584l-1.15-.664M18.154 19.059l-1.595-3.226"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth={1.5}
      />
      <path
        d="M12 7.757l1.06-1.06a3 3 0 014.243 4.242l-2.121 2.122a3 3 0 01-4.243 0M12 16.243l-1.06 1.06a3 3 0 01-4.243-4.242l2.121-2.122a3 3 0 014.243 0"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth={2}
      />
    </IconBase>
  );
}

export default UnlinkIcon;
