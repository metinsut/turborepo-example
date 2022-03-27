import IconBase, { IconBaseProps } from './IconBase';
import React from 'react';

type Props = IconBaseProps & {};

function TrashIcon(props: Props) {
  return (
    <IconBase {...props}>
      <path
        clipRule="evenodd"
        d="M11.5 6a1 1 0 00-1 1H9a1 1 0 00-1 1h8a1 1 0 00-1-1h-1.5a1 1 0 00-1-1h-1zM16 9H8v7a2 2 0 002 2h4a2 2 0 002-2V9zm-5.5 2a.5.5 0 00-1 0v4a.5.5 0 001 0v-4zm1.5-.5a.5.5 0 01.5.5v4a.5.5 0 01-1 0v-4a.5.5 0 01.5-.5zm2.5.5a.5.5 0 00-1 0v4a.5.5 0 001 0v-4z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </IconBase>
  );
}

export default TrashIcon;
