import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps;

function DownloadIcon(props: Props) {
  return (
    <IconBase {...props}>
      <path
        d="M14 16l-2 2-2-2M12 17v-4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        clipRule="evenodd"
        d="M14 13.236V13a2 2 0 10-4 0v.874a3.971 3.971 0 01-.974-.394 2.5 2.5 0 11-1.908-4.451 4.002 4.002 0 016.647-1.92 2.5 2.5 0 012.77.939A3 3 0 1114 13.236z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </IconBase>
  );
}

export default DownloadIcon;
