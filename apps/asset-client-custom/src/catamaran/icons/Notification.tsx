import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps;

function Notification(props: Props) {
  return (
    <IconBase {...props}>
      <path
        clipRule="evenodd"
        d="M13.337 6H10a4 4 0 00-4 4v4a4 4 0 004 4h4a4 4 0 004-4v-3.337a3.486 3.486 0 01-1.5.337v3a2.5 2.5 0 01-2.5 2.5h-4A2.5 2.5 0 017.5 14v-4A2.5 2.5 0 0110 7.5h3c0-.537.12-1.045.337-1.5z"
        fill="currentColor"
        fillRule="evenodd"
      />
      <circle cx={16.5} cy={7.5} fill="currentColor" r={2.5} />
    </IconBase>
  );
}

export default Notification;
